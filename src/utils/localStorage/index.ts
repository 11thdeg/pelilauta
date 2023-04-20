import { Site, Thread } from '@11thdeg/skaldstore'
import { DocumentData } from '@firebase/firestore'
// import { //logDebug } from '../logHelpers'

const THREAD_PREFIX = Thread.collectionName

export function getCachedThread(key: string) {
  //logDebug('Loading thread from local storage', THREAD_PREFIX + '/' + key)
  const data = localStorage.getItem(THREAD_PREFIX + '/' + key)
  if (data) {
    const object = JSON.parse(data) as DocumentData
    if (object) {
      //logDebug('Loaded thread from local storage', object)
      return new Thread(object, key)
    }
  }
}

export function stashThread (thread: Thread) {
  const data = thread.toJSON()
  //logDebug('Stashing thread', THREAD_PREFIX + thread.key, data)

  localStorage.setItem(THREAD_PREFIX + '/' + thread.key, JSON.stringify(data))
}

export function getCachedSites() {
  const sites: Site[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(Site.collectionName)) {
      const data = localStorage.getItem(key)
      if (data) {
        const object = JSON.parse(data) as DocumentData
        if (object) {
          //logDebug('Loaded site from local storage', object)
          sites.push(new Site(object, object.key))
        }
      }
    }
  }
  return sites
}

export function getCachedSite(key: string) {
  //logDebug('Loading site from local storage', Site.collectionName + '/' + key)
  const data = localStorage.getItem(Site.collectionName + '/' + key)
  if (data) {
    const object = JSON.parse(data) as DocumentData
    if (object) {
      //logDebug('Loaded site from local storage', object)
      return new Site(object, key)
    }
  }
}

export function cacheSite(site: Site) {
  const data = site.toJSON()
  //logDebug('Stashing site', Site.collectionName + '/' + site.key, data)

  localStorage.setItem(Site.collectionName + '/' + site.key, JSON.stringify(data))
}

export function purgeSiteCache () {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(Site.collectionName)) {
      localStorage.removeItem(key)
    }
  }
}