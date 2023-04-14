import { Thread } from '@11thdeg/skaldstore'
import { DocumentData } from '@firebase/firestore'
import { logDebug } from '../logHelpers'

const THREAD_PREFIX = Thread.collectionName

export function getCachedThread(key: string) {
  logDebug('Loading thread from local storage', THREAD_PREFIX + '/' + key)
  const data = localStorage.getItem(THREAD_PREFIX + '/' + key)
  if (data) {
    const object = JSON.parse(data) as DocumentData
    if (object) {
      logDebug('Loaded thread from local storage', object)
      return new Thread(object, key)
    }
  }
}

export function stashThread (thread: Thread) {
  const data = thread.toJSON()
  logDebug('Stashing thread', THREAD_PREFIX + thread.key, data)

  localStorage.setItem(THREAD_PREFIX + '/' + thread.key, JSON.stringify(data))
}