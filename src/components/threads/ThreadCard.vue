<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { onMounted, Ref, ref } from 'vue'
import { fetchThread } from '../../composables/useThreads'
import Card from '../ui/Card.vue'

const props = defineProps<{
  threadkey?: string
}>()

const thread:Ref<Thread|undefined> = ref(undefined)

onMounted(async () => {
  if (props.threadkey) thread.value = await fetchThread(props.threadkey)
})

const snippet = computed(() => {
  if (!thread.value) return ''
  if (thread.value.markdownContent) return thread.value.markdownContent.slice(0, 240) + '...'
  const div = document.createElement('div')
      div.innerHTML = thread.value.htmlContent
      let snip = ''
      if (div.firstChild) {
        snip = div.firstChild.textContent || ''
        if (snip.length > 140) snip = snip.substring(0, 140) + '...'
      }
      return snip
})

</script>

<template>
  <Card
    v-if="thread"
    :rise="1"
    class="ThreadCard"
  >
    <cyan-toolbar>
      <cyan-icon :noun="thread.topicid" />
      <h3 class="TypeHeadline6">
        {{ thread.title }}
      </h3>
      <cyan-spacer />
      <cyan-icon noun="share" />
    </cyan-toolbar>
    <div
      class="TypeBody2"
      :innerHTML="snippet"
    />
  </Card>
</template>