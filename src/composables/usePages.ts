import { Page, Site } from "@11thdeg/skaldstore"
import { collection, getFirestore, onSnapshot } from "firebase/firestore"
import { computed, ref } from "vue"
import { logDebug } from "../utils/logHelpers"
import { addStore } from "./useSession"

let sitekey = ''
let unsubscribe:CallableFunction|undefined
const pageCache = ref(new Map<string, Page>())
const masterPageCache = ref(new Map<string, Map<string, Page>>())
const loading = ref(false)

/**
 * Remove all session related info from the store
 */
function reset() {
  sitekey = ''
  unsubscribe && unsubscribe()
  pageCache.value = new Map()
  masterPageCache.value = new Map()
}

async function init (key?: string) {
  if (!key || sitekey === key) return
  logDebug('usePages', 'init', key, Site.collectionName, Page.collectionName)
  reset()
  loading.value = true

  // Stash site pages for further use
  if (pageCache.value) masterPageCache.value.set(sitekey, pageCache.value)

  // Empty the cache
  pageCache.value = new Map()

  // subscribe to the site pages
  sitekey = key
  unsubscribe = await onSnapshot(
    collection(
      getFirestore(),
      Site.collectionName,
      sitekey,
      Page.collectionName
    ),
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          pageCache.value.delete(change.doc.id)
        }
        else {
          const page = new Page(change.doc.data(), change.doc.id)
          pageCache.value.set(change.doc.id, page)
        }
      })
      logDebug('page snapshot loaded')
    }
  )
  loading.value = false
  addStore('pages', reset)
}

const categories = computed(() => {
  const pages = Array.from(pageCache.value.values())
  const cats = new Set<string>()
  pages.forEach((page) => {
    page.category && cats.add(page.category)
  })
  return Array.from(cats)
})

export async function fetchPage (sk: string, pagekey: string) {
  if (sitekey === sk) {
    return pageCache.value.get(pagekey) || undefined
  }
  else if (masterPageCache.value.has(sk)) {
    return masterPageCache.value.get(sk)?.get(pagekey) || undefined
  }
  return undefined
}

export function usePages(key?: string) {
  init(key)
  return {
    pages: computed(() => Array.from(pageCache.value.values())),
    categories,
    loading: computed(() => loading.value)
  }
}