import { Site } from '@11thdeg/skaldstore'
import { collection, doc, getDoc, getFirestore, onSnapshot, query, where } from 'firebase/firestore'
import { computed, ref, watch } from 'vue'
import { logDebug, logError } from '../utils/logHelpers'
import { addStore, useSession } from './useSession'
import { cacheSite, purgeSiteCache } from '../utils/localStorage'

const siteCache = ref(new Map<string, Site>())
const loading = ref(true)

export async function fetchSite (key:string) {
  if(!key) throw new Error('Fetching a site requres a key')
  if (siteCache.value.has(key)) {
    return siteCache.value.get(key)
  }
  const siteDoc = await getDoc(
    doc(getFirestore(), Site.collectionName, key)
  )
  if (siteDoc.exists()) {
    const site = new Site(siteDoc.data(), key)
    siteCache.value.set(key, site)
    return site
  }
  logError('Site not found', key)
  return undefined
}

let _init = false
let unsubscribePublic:CallableFunction|undefined
let unsubscribeOwn:CallableFunction|undefined
let unsubscribePlays:CallableFunction|undefined

async function subscribe () {
  const { uid } = useSession()

  if (_init) return
  _init = true

  addStore('sites', reset)

  subscribePublic()

  watch(uid, async (u) => {
    if (u) {
      subscribeAuthorSites()
      subscribePlayerSites()
    } else {
      unsubscribeOwn && unsubscribeOwn()
      unsubscribePlays && unsubscribePlays()
    }
  }, { immediate: true })
}

async function subscribePublic () {
  logDebug('Subscribing to public sites')
  /*const storedSites = []// getCachedSites()
  if (storedSites) {
    storedSites.forEach((s:Site) => {
      logDebug('loaded from storage', s.key)
      siteCache.value.set(s.key, s)
    })
    loading.value = false
  }*/
  unsubscribePublic = onSnapshot(
    query(
      collection(getFirestore(), Site.collectionName),
      where('hidden', '==', false)
    ),
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const site = new Site(change.doc.data(), change.doc.id)
        // logDebug('loaded from firestore', site.key)
        siteCache.value.set(change.doc.id, site)
        loading.value = false
        cacheSite(site)
      })
    }
  )
}

async function subscribeAuthorSites () {
  const { uid, anonymous } = useSession()
  if (anonymous.value) return
  logDebug('Subscribing to Authors sites', uid.value)
  unsubscribeOwn = onSnapshot(
    query(
      collection(getFirestore(), Site.collectionName),
      where('owners', 'array-contains', uid.value)
    ),
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const site = new Site(change.doc.data(), change.doc.id)
        siteCache.value.set(change.doc.id, site)
        cacheSite(site)
        loading.value = false
      })
    }
  )
}

async function subscribePlayerSites () {
  const { uid, anonymous } = useSession()
  if (anonymous.value) return
  logDebug('Subscribing to Players sites', uid.value)
  unsubscribePlays = onSnapshot(
    query(
      collection(getFirestore(), Site.collectionName),
      where('players', 'array-contains' , uid.value)
    ),
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const site = new Site(change.doc.data(), change.doc.id)
        siteCache.value.set(change.doc.id, site)
        cacheSite(site)
        loading.value = false
      })
    }
  )
}

async function reset() {
  _init = false
  loading.value = true
  unsubscribePublic && unsubscribePublic()
  unsubscribeOwn && unsubscribeOwn()
  unsubscribePlays && unsubscribePlays()
  purgeSiteCache()
}

export function patchSite (site: Site) {
  if(!site.key) throw new Error('Caching a site requres a site.key')
  siteCache.value.set(site.key, site)
}

const sitesAsOptions = computed(() => {
  const options:Record<string, string>[] = []
  const { uid } = useSession()
  siteCache.value.forEach((site) => {
    if (site.hasOwner(uid.value)) options.push({ value: site.key || '', label: site.name })
  })
  return options
})

export function useSites () {
  subscribe()
  return {
    loading,
    fetchSite,
    publicSites: computed(() => {
      return Array.from(siteCache.value.values()).filter(site => !site.hidden)
    }),
    ownSites: computed(() => {
      return Array.from(siteCache.value.values()).filter(site => site.hasOwner(useSession().uid.value))
    }),
    playerSites: computed(() => {
      return Array.from(siteCache.value.values()).filter(site => site.players.includes(useSession().uid.value))
    }),
    allSites: computed(() => {
      const { anonymous } = useSession()
      if (anonymous.value) return Array.from(siteCache.value.values()).filter(site => !site.hidden)
      return Array.from(siteCache.value.values()).sort((a, b) => a.name.localeCompare(b.name))
    }),
    sitesAsOptions
  }
}