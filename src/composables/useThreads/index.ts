import { Thread } from '@11thdeg/skaldstore'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { computed, ref } from 'vue'
import { loveThread, unLoveThread } from './reactions'
import { logDebug } from '../../utils/logHelpers'

const threadCache = ref(new Map<string, Thread>())

export async function purgeThread (threadkey: string) {
  threadCache.value.delete(threadkey)
}

export async function pushThread (thread: Thread) {
  threadCache.value.set(thread.key, thread)
}

export async function fetchThread (key:string, force = false) {
  if (!force && threadCache.value.has(key)) {
    return threadCache.value.get(key)
  }
  
  if (force) logDebug('fetchThread', key, 'by force')

  const document = await getDoc(
    doc(getFirestore(), Thread.collectionName, key)
  )
  if (document.exists()) {
    const thread = new Thread(document.data(), key)
    // Update the cache
    threadCache.value.set(key, thread)
    return thread
  }
  logDebug('fetchThread', key, 'not found')
  return undefined
}

export function useThreads () {
  return {
    threadCache: computed(() => threadCache.value)
  }
}

export { loveThread, unLoveThread }