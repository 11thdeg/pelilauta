<script lang="ts" setup>
import { computed } from 'vue'
import { useSession } from '../../composables/useSession'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import ImageListSection from '../content/ImageListSection.vue'
import MarkdownSection from '../content/MarkdownSection.vue'
import LoveAReplyTag from '../discussion/LoveAReplyTag.vue'
import QuotedResponseSection from '../discussion/QuotedResponseSection.vue'
import ProfileLink from '../profileLink/ProfileLink.vue'

const props = defineProps<{
  threadkey: string,
  reply: {
    key?: string,
    author: string,
    flowTime: number,
    images?: string[],
    quoteRef?: string,
    markdownContent: string,
    htmlContent: string,
    lovers?: string[]
    hasOwner: (uid: string) => boolean
  } 
}>()
const emit = defineEmits<{
  (e: 'update:quote', keys: string[]): void
}>()

const { uid } = useSession()

const isAuthor = computed(() => {
  return props.reply.author === uid.value
})
</script>

<template>
  <cyan-bubble :reply="isAuthor">
    <!-- The top toolbar -->
    <cyan-toolbar small>
      <ProfileLink :uid="reply.author" />
      <cyan-spacer />
      <FlowTimeCaption :flow-time="reply.flowTime" />
      <cyan-icon
        v-if="reply.key"
        text
        small
        noun="quote"
        class="hoverable clickable"
        @click="emit('update:quote', [threadkey, reply.key || ''])"
      />
      <LoveAReplyTag
        :reply="reply"
        :thread-key="threadkey"
      />
    </cyan-toolbar>

    <!-- Images -->
    <ImageListSection
      v-if="reply.images"
      :images="reply.images"
    />

    <!-- Quoted response -->
    <QuotedResponseSection
      v-if="reply.quoteRef"
      style="margin: 12px"
      :threadkey="threadkey"
      :replykey="reply.quoteRef"
    />

    <!-- Markdown/Heritage content -->
    <div style="padding: 0 8px; margin-top: -12px; margin-bottom: -12px;">
      <MarkdownSection
        v-if="reply.markdownContent"
        style="padding: 12px"
        :content="reply.markdownContent"
      />
      <div
        v-else
        :innerHTML="reply.htmlContent"
      />
    </div>
  </cyan-bubble>
</template>