<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed, onMounted, Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchThread } from '../../composables/useThreads'
import TopBar from '../../components/ui/TopBar.vue'
import ThreadPane from '../../components/threads/ThreadPane.vue'
import ThreadDiscussion from '../../components/discussion/ThreadDiscussion.vue'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'

const props = defineProps<{
  threadkey: string
}>()
const { t } = useI18n()
const thread:Ref<Thread|undefined> = ref(undefined)
const loading = ref(true)

onMounted(async () => {
  thread.value = await fetchThread(props.threadkey)
  loading.value = false
})

const title = computed(() => {
  if (!thread.value) return t('threads.loading')
  return thread.value.title
})
</script>

<template>
  <div class="ThreadView">
    <TopBar
      :title="title"
      sticky
    />
    <main class="bookLayout">
      <div v-if="loading">
        <cyan-loader large />
      </div>
      <template v-else>
        <EmptyCollection
          v-if="!thread"
          :title="t('thread.missing.title')"
          noun="discussion"
          :message="t('thread.missing.message')"
        />
        <template v-else>
          <div class="Column double">
            <ThreadPane
              :thread="thread"
            />
            <ThreadDiscussion
              :threadkey="threadkey"
            />
          </div>
        </template>
      </template>
    </main>
  </div>
</template>