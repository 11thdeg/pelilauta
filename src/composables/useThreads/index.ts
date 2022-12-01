import { Thread } from '@11thdeg/skaldstore'
import { collection, doc, getDoc, getDocs, getFirestore, limit, onSnapshot, orderBy, Query, query, QueryDocumentSnapshot, startAfter, where } from 'firebase/firestore'
import { computed, ref } from 'vue'
import { logDebug, logEvent } from '../../utils/logHelpers'
import { addStore } from './../useSession'
import { loveThread, unLoveThread } from './reactions'

let _init = false
let unsubscribeThreads:undefined|CallableFunction
const threadCache = ref(new Map<string, Thread>())

async function init () {
  logDebug('init threads', _init)
  if (_init) return
  _init = true
  addStore('threads', reset)
  if(unsubscribeThreads) unsubscribeThreads()
  unsubscribeThreads = await onSnapshot(
    query(
      collection(
        getFirestore(),
        'stream'
      ),
      limit(5),
      where('public', '==', true),
      orderBy('flowTime', 'desc')
    ),
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if(change.type === 'removed') {
          threadCache.value.delete(change.doc.id)
        } else {
          threadCache.value.set(change.doc.id, new Thread(change.doc.data(), change.doc.id))
        }
      })
    }
  )
  logEvent('stream', {action: 'subscribed', where: 'public'})
}

function reset () {
  if (unsubscribeThreads) unsubscribeThreads()
  threadCache.value = new Map<string, Thread>()
  _init = false
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
  logDebug('fetchThread', key, 'not in cache')
  const document = await getDoc(
    doc(getFirestore(), Thread.collectionName, key)
  )
  if (document.exists()) {
    const thread = new Thread(document.data(), key)
    threadCache.value.set(key, thread)
    return thread
  }
  logDebug('fetchThread', key, 'not found')
  return undefined
}

export function useThreads () {
  init()
  return {
    recent: computed(() => {
      const arr = Array.from(threadCache.value.values())
      if (arr.length > 5) arr.length = 5
      arr.sort((a, b) => a.compareFlowTime(b))
      return arr
    }),
    threadCache: computed(() => threadCache.value)
  }
}

export { loveThread, unLoveThread }