<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { onMounted, Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/navigation/TopBar.vue'
import ThreadEditorColumn from '../../components/ThreadEditorColumn/ThreadEditorColumn.vue'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import { fetchThread } from '../../composables/useThreads'

const props = defineProps<{
  threadkey: string
}>()

const { t } = useI18n()

const loading = ref(true)
const thread:Ref<Thread|undefined> = ref(undefined)

onMounted(async () => {
  const tr = await fetchThread(props.threadkey)
  if (tr) {
    thread.value = tr
  }
  loading.value = false
})

</script>
<template>
  <TopBar :title="thread ? thread.title : ''" />
  <main class="bookLayout">
    <WithLoader :suspended="loading">
      <ThreadEditorColumn
        v-if="thread"
        :thread="thread"
      />
      <EmptyCollection
        v-else
        :title="t('thread.missing.title')"
        noun="discussion"
      />
    </WithLoader>
  </main>
</template>