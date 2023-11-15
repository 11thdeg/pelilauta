import { Page, Site } from '@11thdeg/skaldstore'
import { onSnapshot, doc, getFirestore } from 'firebase/firestore'
import { computed, ref } from 'vue'
import { logDebug, logError } from '../../utils/logHelpers'
import { useSession } from '../useSession'
import { useSite } from '../useSite'

let _unsubscribe:CallableFunction|undefined

const pagekey = ref('')
const sitekey = ref('')
const loading = ref(false)
const notFound = ref(false)
const page = ref<Page|undefined>(undefined)

async function reset () {
  // unsubscribe from the db changes
  _unsubscribe && _unsubscribe()

  pagekey.value = ''
  sitekey.value = ''
  page.value = undefined
  loading.value = true
  notFound.value = false
}

const canEdit = computed (() => {
  if (!page.value) return false
  if (loading.value) return false
  const { admin, uid } = useSession()
  if(admin.value) return true
  if(page.value.hasOwner(uid.value)) return true
  const { site } = useSite()
  if (!site.value) {
    logError('No site found for page', page.value)
    return false
  }
  if (site.value.hasOwner(uid.value)) return true
  return false
})

export async function loadPage(key: string, sk: string) {
  logDebug('Loading page -- no caching enabled at this point', key, sk)

  // Sanity
  if (!key || !sk) {
    logError('No page or site key provided for page', key, sk)
    throw new Error('No page or site key provided for page')
  }

  // Reset
  reset()

  // Getn the page directly from the db
  const docRef = doc(
    getFirestore(),
    Site.collectionName,
    sk,
    Page.collectionName,
    key
  )
  _unsubscribe = await onSnapshot(docRef, (snapshot) => {
    if(snapshot.exists()) {
      const p = new Page(snapshot.data(), snapshot.id)
      page.value = p
      if(!page.value.parentKey) page.value.parentKey = sk
      loading.value = false
    } else {
      page.value = undefined
      loading.value = false
      notFound.value = true
    }
  })
}

export function usePage(key?: string, sk?: string) {  
  // This is historical, we should be using the loadPage function
  if (key && key !== pagekey.value) {
    logDebug('Loading page from use, deprecated: ', key, sk)
    if (!sk) logError('No site key provided for page, falling back to current', key)
    loadPage(key, sk || useSite().key.value)
  }
  
  return {
    key: computed(() => pagekey.value),
    page: computed(() => page.value),
    loading: computed(() => loading.value),
    notFound: computed(() => notFound.value),
    canEdit,
  }
}