<script lang="ts" setup>
import { computed } from 'vue'
import { useScreenSize } from '../../composables/useScreenSize'
import { useSubscriber } from '../../composables/useSession/useSubscriber'

const props = defineProps<{
  thread: {
    key: string | undefined,
    flowTime: number,
    replyCount: number
  }
}>()

const { isSmall } = useScreenSize()
const { subscriber } = useSubscriber()

const count = computed(() => {
  if (isSmall.value) undefined
  return props.thread.replyCount
})

const flowtime = computed(() => subscriber.value?.watches(props.thread.key || '') || 0)

const notify = computed(() => {
  if (!props.thread.key) return false
  if (!subscriber.value) return false
  return subscriber.value.shouldNotify(props.thread.key,props.thread.flowTime)
})

</script>

<template>
  <router-link
    :to="`/threads/${thread.key}/from/${flowtime}`"
    :aria-label="$t('thread.replies')"
  >
    <cn-reaction-button
      noun="discussion"
      :count="count"
      :on="notify"
      disabled
      :aria-pressed="notify + ''"
    />
  </router-link>
</template>