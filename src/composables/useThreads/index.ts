import { Thread } from '@11thdeg/skaldstore'
import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, Query, query, QueryDocumentSnapshot, startAfter, where } from 'firebase/firestore'
import { computed, ref } from 'vue'
import { logDebug  } from '../../utils/logHelpers'
import { addStore } from './../useSession'
import { loveThread, unLoveThread } from './reactions'
import { subscribeStream, unsubscribeStream } from './stream'

const threadCache = ref(new Map<string, Thread>())
const _loading = ref(true)
const initialized = ref(false)

async function init () {
  logDebug('useThreads', 'init', initialized.value)
  if (initialized.value) return

  // Push the threads reset mechanism to the session reset
  // queue
  addStore('threads', reset)

  // Subscribe to the front page stream for threads
  subscribeStream(threadCache, _loading)
}

/**
 * Reset the threads cache and unsubscribe from the stream
 * 
 * Called by the useSession when a user logs out
 */
function reset () {
  unsubscribeStream()
  threadCache.value = new Map<string, Thread>()
  _loading.value = true
  initialized.value = false
}

export async function fetchAuthorThreads (uid:string, count = 3) {
  await init()
  logDebug('fetchAuthorThreads', uid)
  const threads = await getDocs(
    query(
      collection(
        getFirestore(),
        'stream'
      ),
      where('author', '==', uid),
      where('public', '==', true),
      limit(count),
      orderBy('flowTime', 'desc')
    )
  )
  const authorThreads = new Array<Thread>()
  threads.forEach((thread) => {
    authorThreads.push(new Thread(thread.data(), thread.id))
    threadCache.value.set(thread.id, new Thread(thread.data(), thread.id))
  })
  return authorThreads
}

// This is a very annoying Firestore feature: offset has to be docRef, even 
// if documentation states it can be a number
let offsetRef:QueryDocumentSnapshot|undefined = undefined

export async function fetchStreamThreads(stream: string, count = 11, offset = false) {
  await init()
  // logDebug('fetchStreamThreads', stream, count, offset)

  const c = collection(
    getFirestore(),
    Thread.collectionName
  )

  let q:undefined|Query = undefined

  if (!offset) {
    q = query(
      c,
      where('topic', '==', stream),
      where('public', '==', true),
      limit(count),
      orderBy('flowTime', 'desc')
    )
  } else {
    logDebug('fetchStreamThreads', 'offset', offset)
    q = query(
      c, 
      where('topic', '==', stream),
      where('public', '==', true),
      orderBy('flowTime', 'desc'),
      startAfter(offsetRef),
      limit(count)
    )
  }

  const threads = await getDocs(q)
  const streamThreads = new Array<Thread>()
  threads.forEach((thread) => {
    streamThreads.push(new Thread(thread.data(), thread.id))
    threadCache.value.set(thread.id, new Thread(thread.data(), thread.id))
    offsetRef = thread
  })
  // logDebug('fetchStreamThreads results', streamThreads.length, count, offset, threads.size)
  return streamThreads
}

export async function forgetThread (threadkey: string) {
  threadCache.value.delete(threadkey)
}

export async function fetchThread (key:string) {
  if (threadCache.value.has(key)) {
    return threadCache.value.get(key)
  }
  // logDebug('fetchThread', key, 'not in cache')
  const document = await getDoc(
    doc(getFirestore(), Thread.collectionName, key)
  )
  if (document.exists()) {
    const thread = new Thread(document.data(), key)
    threadCache.value.set(key, thread)
    return thread
  }
  // logDebug('fetchThread', key, 'not found')
  return undefined
}

export function useThreads () {
  init()
  return {
    // We are loading if we are not initialized or if we are subscribing to the stream
    loading: computed(() => initialized.value || _loading.value),
    recent: computed(() => {
      return [...threadCache.value.values()]
        .sort((a, b) => a.compareFlowTime(b))
        .slice(0, 5)
    }),
    threadCache: computed(() => threadCache.value)
  }
}

export { loveThread, unLoveThread }