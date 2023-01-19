<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScreenSize } from '../../composables/useScreenSize'
import { useSubscriber } from '../../composables/useSession/useSubscriber'

const props = defineProps<{
  thread: {
    key: string | undefined,
    flowTime: number,
    replyCount: number
  }
}>()

const { t } = useI18n()
const { isSmall } = useScreenSize()

const { subscriber } = useSubscriber()


const notification = computed(() => {
  if (!subscriber.value) return undefined
  const threadkey = props.thread.key || ''
  const s = subscriber.value
  return s.shouldNotify(threadkey, props.thread.flowTime) || undefined
})

const label = computed(() => {
  if (isSmall.value) return props.thread.replyCount + ''
  return props.thread.replyCount + ' ' + t('threads.replies')
})

</script>

<template>
  <router-link
    :to="`/threads/${thread.key}`"
  >
    <cyan-tag
      :label="label"
      noun="discussion"
      :notification="notification"
    />
  </router-link>
</template>