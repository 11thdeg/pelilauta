<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed, onMounted, Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchThread } from '../../composables/useThreads'
import TopBar from '../../components/ui/TopBar.vue'
import ThreadPane from '../../components/threads/ThreadPane.vue'
import ThreadDiscussion from '../../components/discussion/ThreadDiscussion.vue'

const props = defineProps<{
  threadkey: string
}>()
const { t } = useI18n()
const thread:Ref<Thread|undefined> = ref(undefined)

onMounted(async () => {
  if (props.threadkey) thread.value = await fetchThread(props.threadkey)
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
      <div class="Column double">
        <ThreadPane :threadkey="threadkey" />
        <ThreadDiscussion :threadkey="threadkey" />
      </div>
      
      <article class="code">
        {{ threadkey }}
      </article>
    </main>
  </div>
</template>