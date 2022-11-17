<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed, onMounted, Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSubscriber } from '../../composables/useSession/useSubscriber'
import { fetchThread } from '../../composables/useThreads'

const props = defineProps<{
  threadkey: string
}>()

const { t } = useI18n()
const thread:Ref<Thread|undefined> = ref(undefined)

onMounted(async () => {
  if (props.threadkey) thread.value = await fetchThread(props.threadkey)
})

const { subscriber } = useSubscriber()


const notification = computed(() => {
  if (!thread.value) return undefined
  if (!subscriber.value) return undefined
  const threadkey = thread.value.key || ''
  const s = subscriber.value
  return s.shouldNotify(threadkey, thread.value.flowTime) || undefined
})
</script>

<template>
  <cyan-loader
    v-if="!thread"
    xsmall
  />
  <router-link
    v-else
    :to="`/threads/${thread.key}`"
  >
    <cyan-tag
      :label="thread.replyCount + ' ' + t('threads.replies')"
      noun="discussion"
      :notification="notification"
    />
  </router-link>
</template>