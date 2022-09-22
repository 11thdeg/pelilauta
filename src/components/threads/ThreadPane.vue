<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import { fetchThread } from '../../composables/useThreads'
import ProfileTag from '../profiles/ProfileTag.vue'
import MarkdownSection from '../content/MarkdownSection.vue'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'

const props = defineProps<{
  threadkey: string
}>()

const thread = ref<Thread|undefined>(undefined)

onMounted(async () => {
  if (props.threadkey) thread.value = await fetchThread(props.threadkey)
})
</script>

<template>
  <cyan-loader
    v-if="!thread"
    wide
  />
  <article
    v-if="thread"
    class="ThreadPane"
  >
    <h1>{{ thread.title }}</h1>
    <cyan-toolbar>
      <ProfileTag :uid="thread.author" />
      <cyan-spacer />
      <FlowTimeCaption :flow-time="thread.flowTime" />
    </cyan-toolbar>
    <MarkdownSection
      v-if="thread.markdownContent"
      :content="thread.markdownContent"
    />
    <div
      v-else
      :innerHTML="thread.htmlContent"
    />
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-icon
        noun="eye"
        xsmall
      />
      <cyan-icon
        noun="love"
        xsmall
      />
    </cyan-toolbar>
  </article>
</template>