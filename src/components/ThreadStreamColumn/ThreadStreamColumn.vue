<script lang="ts" setup>
/*
 * As a mental reminder for myself – this code was extracted from the useThreads – as it made little
 * sense to DRY the code just because of DRY. 
 * 
 * This component loads a stream of cards (for a given topic, if any), Subscribes to the top 7, and fetches more
 * when the user clicks on the "Load More" button.
 * 
 */

import { Thread } from '@11thdeg/skaldstore'
import { collection, getFirestore, limit, onSnapshot, query, where, orderBy, startAfter, getDocs, QueryDocumentSnapshot, DocumentData } from '@firebase/firestore'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { logDebug, logError } from '../../utils/logHelpers'
import ThreadStreamCard from './ThreadStreamCard.vue'

const props = defineProps<{
  topic?: string
  large?: boolean
}>()

const streamThreads = ref<Thread[]>([])
let paginationRef:QueryDocumentSnapshot<DocumentData>|undefined = undefined
let unsubscribe:CallableFunction|undefined = undefined

function pushThreadToStream (thread:Thread) {
  const arr = [...streamThreads.value.filter(t => t.key !== thread.key)]
  if (!thread.sticky) arr.push(thread)
  streamThreads.value = [...arr].sort((a, b) => a.compareFlowTime((b as Thread)))
  for (let i = 0; i < 3 && i < arr.length; i++) {
    const t = streamThreads.value[i]
    if (t) storeThreadLocally(t as Thread)
  }
}

function loadStoredThreads () {
  const frontPageThreads = localStorage.getItem('frontPageThreads')
  if (frontPageThreads) {
    const threads = JSON.parse(frontPageThreads)
    threads.forEach((t:Thread) => {
      const thread = new Thread(t, t.key)
      pushThreadToStream(thread)
    })
  }
}

function storeThreadLocally (thread:Thread) {
  const frontPageThreads = localStorage.getItem('frontPageThreads')
  if (frontPageThreads) {
    const threads = JSON.parse(frontPageThreads)
    if (threads.length > 5) {
      threads.shift()
    }
    localStorage.setItem('frontPageThreads', JSON.stringify(threads))
  }
  else {
    localStorage.setItem('frontPageThreads', JSON.stringify([thread]))
  }
}

watch(props, () => {
  unsubscribe && unsubscribe()
  streamThreads.value = []
  paginationRef = undefined
  subscribeTopThreads()
  atEnd.value = false
})

function subscribeTopThreads () {

  const q = !props.topic ? query(
    collection(
      getFirestore(),
      'stream'
    ),
    limit(7),
    where('public', '==', true),
    orderBy('flowTime', 'desc')
  ) : query(
    collection(
      getFirestore(),
      'stream'
    ),
    limit(7),
    where('public', '==', true),
    where('topic', '==', props.topic),
    orderBy('flowTime', 'desc')
  )
  
  unsubscribe = onSnapshot(q,
    (snapshot) => {
      let pgRef:QueryDocumentSnapshot<DocumentData>|undefined = undefined
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          streamThreads.value = streamThreads.value.filter(t => t.key !== change.doc.id)
        }
        else {
          const t = new Thread(change.doc.data(), change.doc.id)
          pushThreadToStream(t)
          pgRef = change.doc
        }
      })
      // This is the first time we are fetching the data via subscription, so we need to set the
      // initial pagination reference.
      if (!paginationRef) {
        paginationRef = pgRef
      }
    }
  )
}

onMounted(() => {
  loadStoredThreads()
  subscribeTopThreads()
})

onUnmounted(() => {
  unsubscribe && unsubscribe()
})
  
const atEnd = ref(false)
async function loadMore () {
  logDebug('ThreadStreamColumn', 'loadMore', 'Loading more threads')
  if (atEnd.value) {
    logError('ThreadStreamColumn', 'loadMore', 'Already at the end of the stream')
    return
  }

  const q = !props.topic ? query(
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
    where('topic', '==', props.topic),
    orderBy('flowTime', 'desc'),
    startAfter(paginationRef)
  )

  const newDocs = await getDocs(q)
  if (newDocs.docs.length < 7) {
    atEnd.value = true
  }

  logDebug('ThreadStreamColumn', 'loadMore', `Loaded ${newDocs.docs.length} threads`)

  newDocs.forEach((doc) => {
    const t = new Thread(doc.data(), doc.id)
    logDebug('ThreadStreamColumn', 'loadMore', `Pushing thread ${t.key} to stream`)
    pushThreadToStream(t)
    paginationRef = doc
  })
}

</script>
<template>
  <article
    class="Column"
    :class="{ large: large }"
  >
    <cyan-loader
      v-if="streamThreads.length === 0"
      large
    />
    <div class="flex flex-column">
      <ThreadStreamCard
        v-for="thread in streamThreads"
        :key="thread.key"
        :thread="thread"
      />
    </div>
    <hr>
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        secondary
        :disabled="atEnd"
        noun="discussion"
        :label="$t('action.toDiscussion')"
        @click="loadMore"
      />
      <cyan-spacer />
    </cyan-toolbar>
  </article>
</template>