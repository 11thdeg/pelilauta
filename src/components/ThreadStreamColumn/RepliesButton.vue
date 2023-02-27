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

</script>

<template>
  <router-link
    :to="`/threads/${thread.key}/from/${flowtime}`"
  >
    <cn-reaction-button
      noun="discussion"
      :count="count"
      on
      aria-pressed="true"
    />
  </router-link>
</template>