import { Site } from '@11thdeg/skaldstore'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import { computed, onMounted, ref } from 'vue'
import { addStore, useSession } from '../useSession'
import { patchSite } from '../useSites'
import { usePages } from '../usePages'
import { logDebug } from '../../utils/logHelpers'
import { useRouter } from 'vue-router'

// let subscribedSitekey = ''

// Firestore doc key of the site we are subscribed to
const key = ref('')
const site = ref(new Site())
const notFound = ref(false)

let unsubscribeSite:CallableFunction|undefined

const loading = ref(false)

function reset () {
  key.value = ''
  site.value = new Site()
  unsubscribeSite && unsubscribeSite()
}

/**
 * Subscribes to the site with the current key
 */
function subscribeSite () {
  addStore('site', reset)

  unsubscribeSite = onSnapshot(
    doc(getFirestore(), Site.collectionName, key.value),
    (snapshot) => {
      // We got a snapshot, so lets update site data
      if(snapshot.exists()) {
        const s = new Site(snapshot.data(), snapshot.id)
        site.value = s

        // Save to local storage
        localStorage.setItem(s.getFirestorePath().join('/'), JSON.stringify(s.toJSON()))

        // Patch it to sites collection
        patchSite(s)

        logDebug('subscribeSite', 'Site updated from FS', s.name)
      }
      // Else: site does not exist, so we remover it from local storage and store
      else {
        logDebug('subscribeSite', 'Site does not exist, removing from local storage', key.value)

        // Remove from local storage, as the site (no longer) exists
        localStorage.removeItem(new Site({key: key.value}).getFirestorePath().join('/'))
        site.value = new Site()
        notFound.value = true
      }
      loading.value = false
    }
  )
}

function loadSiteFromLocalStorage () {
  const LocalStorageKey = new Site({key: key.value}).getFirestorePath().join('/')
  const siteData = localStorage.getItem(LocalStorageKey)
  if(!siteData) {
    logDebug('loadSiteFromLocalStorage', 'No site data in LocalStorage')
    site.value = new Site()
  }
  const s = new Site(JSON.parse(siteData || '{}'))
  site.value = s

  // Set loading state to false
  loading.value = false

  logDebug('loadSiteFromLocalStorage', 'Loaded site from LocalStorage', s.name)
}

/**
 * Loads the site to be used by the composable.
 */
function loadSite () {
  // logDebug('loadSite', 'Loading site', key.value, site.value.key)

  if (!key.value) return // no key to load

  // Sanity check, do not load if already loaded
  if (site.value.key === key.value) throw new Error('Site already loaded')

  logDebug('loadSite', 'Loading site', key.value)

  // Set loading states to true
  loading.value = true
  notFound.value = false

  // Load the site from LocalStorage
  loadSiteFromLocalStorage()

  // Subscribe to the site
  subscribeSite()
}

const canEdit = computed(() => {
  if (!site.value?.key) return false
  const { uid, admin } = useSession()
  if (admin.value) return true
  const u = uid.value
  if (site.value.members?.includes(u)) return true
  if (site.value.players?.includes(u)) return true
  if (site.value.hasOwner(u)) return true
  logDebug('canEdit', 'nope')
  return false
})

const chapterOptions = computed(() => {
  const cats = site.value?.pageCategories
  if (!cats) return []
  return [
    { label: '-', value: '-' },
    ...cats.map(c => ({
      label: c.name,
      value: c.slug
    }))]
})

/**
 * Composable for current site (if any) from the router.
 * 
 * The function `loadSite` will be called by onMounted, if the siteKey has changed.
 * Additionally, the function `subscribePages` will be called, to prefetch 
 * the pages of site.
 * 
 * @returns 
 */

export function useSite () {
  const router = useRouter()

  // onMounted will call loadSite, if key changed
  onMounted(() => {
    const siteKey = router.currentRoute.value.params.sitekey
    // logDebug('useSite', 'onMounted', siteKey)
    if (
      siteKey && 
      typeof siteKey === 'string' 
      && siteKey !== key.value) {
      // Set key, so we don't load again
      key.value = siteKey
      logDebug('useSite', 'onMounted', 'key changed', siteKey)

      // Load the site
      if (!loading.value) {
        loadSite()
        usePages(siteKey)
      }
    }
  })

  return {
    key: computed(() => key.value),
    site: computed(() => site.value),
    // This is just to provide a default value for the computed property
    chapters: computed(() => site.value?.pageCategories || []),
    // The above, provided as option params
    chapterOptions,
    loading: computed(() => loading.value),
    notFound: computed(() => notFound.value),
    canEdit
  }
}