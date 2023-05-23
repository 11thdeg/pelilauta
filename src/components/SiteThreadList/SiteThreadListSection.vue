<script setup lang="ts">
import { Thread } from '@11thdeg/skaldstore'
import { collection, getFirestore, limit, onSnapshot, query, where, orderBy } from '@firebase/firestore'
import { ref } from 'vue'
import { onUnmounted } from 'vue'
import { onMounted } from 'vue'
import { logDebug } from '../../utils/logHelpers'
import SiteThreadListItem from './SiteThreadListItem.vue'
import { computed } from 'vue'

const props = defineProps<{
  sitekey: string,
  count?: number,
  omit?: Array<string>
}>()

let _unsubscribe: CallableFunction|undefined

const threads = ref(new Array<Thread>())

async function subscribe () {

  logDebug('SiteThreadListSection: subscribe')

  if (_unsubscribe) return

  const lim = props.count || 21
  if (lim < 1) throw new Error('SiteThreadListSection: count must be greater than 0')

  const q = query(
    collection(getFirestore(), Thread.collectionName),
    where('site', '==', props.sitekey),
    orderBy('flowTime', 'asc'),
    limit(lim)
  )

  _unsubscribe = onSnapshot(q, (snapshot) => {
    logDebug('SiteThreadListSection: onSnapshot')
    snapshot.docChanges().forEach(change => {
      if (change.type === 'removed') {
        threads.value = threads.value.filter(tr => tr.key !== change.doc.id)
      } else {
        const thread = new Thread(change.doc.data(), change.doc.id)
        threads.value = threads.value.filter(tr => tr.key!== thread.key)
        threads.value.push(thread)
      }
      threads.value.sort((a, b) => (a as Thread).compareFlowTime(b as Thread))
    })
    logDebug('SiteThreadListSection: onSnapshot: threads', threads.value.length)
  })
}

onMounted(async () => {
  await subscribe()
})
onUnmounted(() => {
  _unsubscribe && _unsubscribe()
})

const visibleThreads = computed(() => {
  return threads.value.filter(thread => !props.omit?.includes(thread.key))
})

</script>

<template>
  <section v-if="threads && threads.length > 0">
    <div class="flex">
      <cyan-icon
        noun="discussion"
      />
      <h4 class="downscaled">
        {{ $t('site.threads.title') }}
      </h4>
    </div>
    <hr>
    <ul>
      <SiteThreadListItem
        v-for="thread in visibleThreads"
        :key="thread.key"
        :thread="thread"
      />
    </ul>
  </section>
</template>