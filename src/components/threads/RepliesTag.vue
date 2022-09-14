<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed, onMounted, Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchThread } from '../../composables/useThreads'
import { useWatch } from '../../composables/useWatch'

const props = defineProps<{
  threadkey: string
}>()

const { t } = useI18n()
const thread:Ref<Thread|undefined> = ref(undefined)

onMounted(async () => {
  if (props.threadkey) thread.value = await fetchThread(props.threadkey)
})
const { updatedSince } = useWatch()
const notification = computed(() => {
  if (!thread.value) return undefined
  return updatedSince(thread.value.key || '', thread.value.flowTime) ? true : undefined
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
      :label="t('threads.replies', { count: thread.replyCount })"
      noun="discussion"
      :notification="notification"
    />
  </router-link>
</template>