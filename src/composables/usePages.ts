import { Page, Site } from '@11thdeg/skaldstore'
import { collection, doc, getDoc, getFirestore, onSnapshot } from 'firebase/firestore'
import { computed, ref } from 'vue'
import { logDebug } from '../utils/logHelpers'
import { addStore } from './useSession'

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
  logDebug('usePages', 'init', key, Page.collectionName)
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
          // logDebug('usePages', 'caching', 'page', page.key)
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
  if (!pagekey) return undefined // no pagekey, no page to fetch

  if (sitekey === sk) {
    if (pageCache.value.has(pagekey))
      return pageCache.value.get(pagekey)
  }
  else if (masterPageCache.value.has(sk)) {
    if (masterPageCache.value.get(sk)?.has(pagekey)) 
      return masterPageCache.value.get(sk)?.get(pagekey)
  }
  // not found in cache, fetch from db if available
  logDebug('fetchPage from db', sk, pagekey)

  const pageDoc = await getDoc(
    doc(
      getFirestore(),
      Site.collectionName,
      sk,
      Page.collectionName,
      pagekey
    )
  )
  if (pageDoc.exists()) {
    const page = new Page(pageDoc.data(), pageDoc.id)
    if (sitekey === sk) pageCache.value.set(pagekey, page)
    masterPageCache.value.get(sk)?.set(pagekey, page)
    return page
  }
  logDebug('fetchPage not found', sk, pagekey)
  return undefined
}

export function subscribePages (key: string) {
  logDebug('subscribePages: reroutes to usePages(key)', key)
  usePages(key)
}

export function usePages(key?: string) {
  init(key)
  return {
    pages: computed(() => Array.from(pageCache.value.values())),
    categories,
    loading: computed(() => loading.value),
    pageOptions: computed(() => {
      return Array.from(pageCache.value.values()).map((page) => {
        return { value: page.key, label: page.name }
      })
    })
  }
}