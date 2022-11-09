<script lang="ts" setup>
import { useFromMe } from '../../composables/useFromMe'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import ImageListSection from '../content/ImageListSection.vue'
import MarkdownSection from '../content/MarkdownSection.vue'
import LoveAReplyTag from '../discussion/LoveAReplyTag.vue'
import QuotedResponseSection from '../discussion/QuotedResponseSection.vue'
import ProfileLink from '../profileLink/ProfileLink.vue'
import ReplyMenu from './ReplyMenu.vue'

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
    lovers?: string[],
    owners: string[],
    hasOwner: (uid: string) => boolean
  } 
}>()
const emit = defineEmits<{
  (e: 'update:quote', keys: string[]): void
  (e: 'edit', key: string): void
  (e: 'delete', key: string): void
}>()

const { fromMe } = useFromMe(props.reply)
</script>

<template>
  <cyan-bubble :reply="fromMe">
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
      <ReplyMenu
        :reply="reply"
        @edit="emit('edit', reply.key || '')"
        @delete="emit('delete', reply.key || '')"
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