import { Page, Site } from '@11thdeg/skaldstore'
import { onSnapshot, doc, getFirestore } from 'firebase/firestore'
import { computed, ref } from 'vue'
import { logError } from '../../utils/logHelpers'
import { usePages } from '../usePages'
import { useSession } from '../useSession'
import { useSite } from '../useSite'

let _unsubscribe:CallableFunction|undefined

const pagekey = ref('')
const sitekey = ref('')
const loading = ref(false)
const page = ref<Page|undefined>(undefined)

async function reset () {
  pagekey.value = ''
  sitekey.value = ''
  page.value = undefined
  loading.value = true
}

async function init(key?: string, sk?: string) {
  if (!key) return
  if (key === pagekey.value) return
  if (sk !== sitekey.value) {
    reset()
    sitekey.value = sk || ''
  }
  pagekey.value = key || ''
  // use stale and revalidate
  const { masterPageCache, pushToCache } = usePages()
  if (masterPageCache.value.has(sitekey.value)) {
    const cache = masterPageCache.value.get(sitekey.value)
    if (cache && cache.has(pagekey.value)) {
      page.value = cache.get(pagekey.value)
      loading.value = false
    }
    else loading.value = true
  }
  else loading.value = true

  // subscribe to the site pages, for valid data
  _unsubscribe && _unsubscribe()
  _unsubscribe = onSnapshot(
    doc(
      getFirestore(),
      Site.collectionName,
      sitekey.value,
      Page.collectionName,
      pagekey.value
    ),
    (snapshot) => {
      if(snapshot.exists()) {
        const p = new Page(snapshot.data(), snapshot.id)
        page.value = p
        // Add the page to the cache
        pushToCache(sitekey.value, key, p)
        loading.value = false
      } else {
        page.value = undefined
      }
    }
  )
}

const canEdit = computed (() => {
  if (!page.value) return false
  if (loading.value) return false
  const { admin, uid } = useSession()
  if(admin.value) return true
  if(page.value.hasOwner(uid.value)) return true
  const { site } = useSite(sitekey.value)
  if (!site.value) {
    logError('No site found for page', page.value)
    return false
  }
  if (site.value.hasOwner(uid.value)) return true
  return false
})

export function usePage(key?: string, sk?: string) {
  init(key, sk)
  return {
    key: computed(() => pagekey.value),
    page: computed(() => page.value),
    loading: computed(() => loading.value),
    notFound: computed(() => !loading.value && !page.value),
    canEdit
  }
}