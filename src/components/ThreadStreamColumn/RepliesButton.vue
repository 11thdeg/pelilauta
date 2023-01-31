<script lang="ts" setup>
import { computed } from 'vue'
import { useScreenSize } from '../../composables/useScreenSize'

const props = defineProps<{
  thread: {
    key: string | undefined,
    flowTime: number,
    replyCount: number
  }
}>()

const { isSmall } = useScreenSize()

const count = computed(() => {
  if (isSmall.value) undefined
  return props.thread.replyCount
})

</script>

<template>
  <router-link
    :to="`/threads/${thread.key}`"
  >
    <cn-reaction-button
      noun="discussion"
      :count="count"
      on
      aria-pressed="true"
    />
  </router-link>
</template>