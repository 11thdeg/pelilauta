<script lang="ts" setup>
import { computed } from 'vue'
import { useScreenSize } from '../../composables/useScreenSize'
import { useSubscriber } from '../../composables/useSubscriber'

const props = defineProps<{
  thread: {
    key: string | undefined,
    flowTime: number,
    replyCount: number
  }
}>()

const { isSmall } = useScreenSize()
const { isNew, seenAt } = useSubscriber()

const count = computed(() => {
  if (isSmall.value) undefined
  return props.thread.replyCount
})

const flowtime = computed(() => seenAt(props.thread.key || '-'))

const notify = computed(() => {
  if (!props.thread.key) return false
  return isNew(props.thread.key,props.thread.flowTime)
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