/**
 * Isoated from the rest of the component to make it easier to 
 * understand, triage, and test.
 */

import { Thread } from '@11thdeg/skaldstore'
import { collection, DocumentData, getDocs, getFirestore, limit, onSnapshot, orderBy, query, QueryDocumentSnapshot, startAfter, where } from '@firebase/firestore'
import { computed, ref } from 'vue'
import { logDebug, logError } from '../../utils/logHelpers'

export type ThreadStreamOptions = {
  pageSize?: number
  topic?: string
  site?: string
  orderBy?: string
}

let unsubscribe:CallableFunction|undefined = undefined
let paginationRef:QueryDocumentSnapshot<DocumentData>|undefined = undefined

const pageSize = ref(11)
const topic = ref('')
const loading = ref(true)
const threads = ref(new Map<string, Thread>())
const atEnd = ref(false)


function getStoragePath() {
  return topic.value ? `threads-${topic.value}` : 'threads'
}

function loadLocalThreads() {
  // Load from local storage
  const localThreads = localStorage.getItem(getStoragePath())
  if (localThreads) {
    const threadObjects = JSON.parse(localThreads)
    threadObjects.forEach((threadObject:Thread) => {
      // Create a new thread class from the thread object
      const thread = new Thread(threadObject, threadObject.key)
      threads.value.set(thread.key, thread)
    })
    // If we have local threads, we will assume they are recent enough, 
    // and load newer threads in the background
    loading.value = false
  }
}

function saveLocalThreads() {
  const threadObjects = sortedThreads()
  if (threadObjects.length > pageSize.value) threadObjects.length = pageSize.value
  localStorage.setItem(getStoragePath(), JSON.stringify(threadObjects))
}

async function loadRemoteThreads() {
  // Generate the query
  const q = !topic.value ? query(
    collection(
      getFirestore(),
      Thread.collectionName
    ),
    limit(pageSize.value),
    where('public', '==', true),
    orderBy('flowTime', 'desc')
  ) : query(
    collection(
      getFirestore(),
      'stream'
    ),
    limit(7),
    where('public', '==', true),
    where('topic', '==', topic.value),
    orderBy('flowTime', 'desc')
  )

  unsubscribe = onSnapshot(q,
    (snapshot) => {
      let pgRef:QueryDocumentSnapshot<DocumentData>|undefined = undefined
      snapshot.docChanges().forEach((change) => {
        loading.value = false
        if (change.type === 'removed') {
          threads.value.delete(change.doc.id)
        }
        else {
          const t = new Thread(change.doc.data(), change.doc.id)
          threads.value.set(t.key, t)
          pgRef = change.doc
        }
      })
      // This is the first time we are fetching the data via subscription, so we need to set the
      // initial pagination reference.
      if (!paginationRef) {
        paginationRef = pgRef
      }
      // Lets update the local storage with the latest threads
      saveLocalThreads()
    }
  )
}

async function loadMore () {
  logDebug('ThreadStreamColumn', 'loadMore', 'Loading more threads')
  if (atEnd.value) {
    logError('ThreadStreamColumn', 'loadMore', 'Already at the end of the stream')
    return
  }

  const q = !topic.value ? query(
    collection(
      getFirestore(),
      'stream'
    ),
    limit(7),
    where('public', '==', true),
    orderBy('flowTime', 'desc'),
    startAfter(paginationRef)
  ) : query(
    collection(
      getFirestore(),
      'stream'
    ),
    limit(7),
    where('public', '==', true),
    where('topic', '==', topic.value),
    orderBy('flowTime', 'desc'),
    startAfter(paginationRef)
  )

  const newDocs = await getDocs(q)
  if (newDocs.docs.length < pageSize.value) {
    atEnd.value = true
  }

  logDebug('ThreadStreamColumn', 'loadMore', `Loaded ${newDocs.docs.length} threads`)

  newDocs.forEach((doc) => {
    const t = new Thread(doc.data(), doc.id)
    logDebug('ThreadStreamColumn', 'loadMore', `Pushing thread ${t.key} to stream`)
    threads.value.set(t.key, t)
    paginationRef = doc
  })
}

function flush() {
  unsubscribe && unsubscribe()
  threads.value = new Map<string, Thread>()
}

function reInit(options?:ThreadStreamOptions) {
  // Force loading to true on every call
  loading.value = true
  flush()
  if (options?.pageSize) {
    pageSize.value = options.pageSize
  }
  if (options?.topic) {
    topic.value = options.topic
  }
  loadLocalThreads()
  loadRemoteThreads()
}

function sortedThreads() {
  return [...threads.value.values()].sort((a, b) => b.flowTime - a.flowTime)
}

export function useThreads(options?:ThreadStreamOptions) {
  reInit(options)
  return {
    pageSize: computed(() => pageSize.value),
    loading: computed(() => loading.value),
    threads: computed(() => sortedThreads()),
    flush,
    loadMore,
    reInit,
    atEnd: computed(() => atEnd.value)
  }
}