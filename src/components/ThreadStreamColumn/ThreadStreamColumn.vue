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
import { collection, DocumentReference, getFirestore, limit, onSnapshot, query, where, orderBy } from '@firebase/firestore'
import { ref, onMounted, onUnmounted } from 'vue'
import ThreadStreamCard from './ThreadStreamCard.vue'

const props = defineProps<{
  topic?: string
  large?: boolean
}>()

const streamThreads = ref<Thread[]>([])
let paginationRef:DocumentReference|undefined = undefined
let unsubscribe:CallableFunction|undefined = undefined

function pushThreadToStream (thread:Thread) {
  const arr = [...streamThreads.value.filter(t => t.key !== thread.key)]
  arr.push(thread)
  streamThreads.value = [...arr].sort((a, b) => a.compareFlowTime((b as Thread)))
}

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
      let pgRef:DocumentReference|undefined = undefined
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          streamThreads.value = streamThreads.value.filter(t => t.key !== change.doc.id)
        }
        else {
          const t = new Thread(change.doc.data(), change.doc.id)
          pushThreadToStream(t)
          pgRef = change.doc.ref
        }
      })
      // This is the first time we are fetching the data via subscription, so we need to set the
      // initial pagination reference.
      if (!paginationRef) {
        paginationRef= pgRef
      }
    }
  )
}

onMounted(() => {
  subscribeTopThreads()
})

onUnmounted(() => {
  unsubscribe && unsubscribe()
})
  
</script>
<template>
  <article
    class="Column flex flex-column"
    :class="{ large: large }"
  >
    <ThreadStreamCard
      v-for="thread in streamThreads"
      :key="thread.key"
      :thread="thread"
    />
  </article>
</template>