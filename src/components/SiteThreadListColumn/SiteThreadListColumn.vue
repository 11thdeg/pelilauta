<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { collection, getFirestore, limit, onSnapshot, query, where, orderBy } from '@firebase/firestore'
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SiteThreadListItem from './SiteThreadListItem.vue'

const props = defineProps<{
  sitekey: string
}>()

const { t } = useI18n()

const threads = ref(new Array<Thread>())
let _unsubscribe: CallableFunction|undefined

onMounted(async () => {
  const q = query(
    collection(getFirestore(), Thread.collectionName),
    where('site', '==', props.sitekey),
    orderBy('flowTime', 'asc'),
    limit(5)
  )

  // const docs = await getDocs(q)
  // logDebug('SiteThreadListColumn', 'onMounted', 'docs', docs)

  _unsubscribe = onSnapshot(q, (snapshot) => {
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
  })
})

onUnmounted(() => {
  _unsubscribe && _unsubscribe()
})

</script>
<template>
  <article class="Column small">
    <h2 class="downscaled">
      {{ t('site.threads.title') }}
    </h2>
    <p v-if="threads.length === 0">
      No threads
    </p>
    <ul>
      <SiteThreadListItem
        v-for="thread in threads"
        :key="thread.key"
        :thread="thread"
      />
    </ul>
  </article>
</template>

<style lang="sass" scoped>
ul
  margin: 12px 0
  padding: 0
</style>