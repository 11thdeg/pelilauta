import { Page, Site } from "@11thdeg/skaldstore"
import { collection, getFirestore, onSnapshot } from "firebase/firestore"
import { computed, ref } from "vue"
import { logDebug } from "../utils/logHelpers"
import { addStore } from "./useSession"

let sitekey = ''
let unsubscribe:CallableFunction|undefined
const pageCache = ref(new Map<string, Page>())
const loading = ref(false)

function reset() {
  sitekey = ''
  unsubscribe && unsubscribe()
}

async function init (key?: string) {
  if (!key || sitekey === key) return
  logDebug('usePages', 'init', key, Site.collectionName, Page.collectionName)
  reset()
  loading.value = true
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