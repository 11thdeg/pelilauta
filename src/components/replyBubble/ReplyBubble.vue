<script lang="ts" setup>
import { ref } from 'vue'
import { useFromMe } from '../../composables/useFromMe'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import ImageListSection from '../content/ImageListSection.vue'
import LoveAReplyTag from '../discussion/LoveAReplyTag.vue'
import QuotedResponseSection from '../discussion/QuotedResponseSection.vue'
import ProfileLink from '../profileLink/ProfileLink.vue'
import ReplyMenu from './ReplyMenu.vue'
import ReplyEditor from './ReplyEditor.vue'
import { deleteDoc, doc, getFirestore } from '@firebase/firestore'
import { Reply, Thread } from '@11thdeg/skaldstore'
import { useSnack } from '../../composables/useSnack'
import { useContentEntry } from '../../composables/useContentEntry'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar.vue'
import { useScreenSize } from '../../composables/useScreenSize'

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
    owners: string|string[],
    hasOwner: (uid: string) => boolean
  } 
}>()
const emit = defineEmits<{
  (e: 'update:quote', keys: string[]): void
}>()

const { pushSnack } = useSnack()
const { isLarge } = useScreenSize()

// eslint-disable-next-line vue/no-setup-props-destructure
const { fromMe } = useFromMe(props.reply)
const editorActive = ref(false)

async function trash () {
  await deleteDoc(
    doc(
      getFirestore(),
      Thread.collectionName,
      props.threadkey,
      Reply.collectionName,
      props.reply.key || '')
  )
  pushSnack('snacks.reply.deleted')
  editorActive.value = false
}
// eslint-disable-next-line vue/no-setup-props-destructure
const { content } = useContentEntry(props.reply)
</script>

<template>
  <div class="flex flex-no-wrap">
    <ProfileAvatar 
      v-if="isLarge && !fromMe"
      :uid="reply.author"
      style="align-self: flex-start; margin-right: -16px"
    />
    <cyan-bubble
      :reply="fromMe"
      style="flex-grow:1"
    >
      <!-- The top toolbar -->
      <cyan-toolbar small>
        <ProfileLink :uid="reply.author" />
        <cyan-spacer />
        <FlowTimeCaption
          class="hideOnMobile"
          :flow-time="reply.flowTime"
        />
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
          @edit="editorActive = true"
          @delete="trash"
        />
      </cyan-toolbar>

      <template v-if="!editorActive">
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
        <div
          :innerHTML="content"
          class="TypeBody2 replyContent"
        />
      </template>
      <template v-else>
        <ReplyEditor
          :threadkey="threadkey"
          :reply="reply"
          @update:quote="emit('update:quote', $event)"
          @close-editor="editorActive = false"
        />
      </template>
    </cyan-bubble>
    <ProfileAvatar 
      v-if="isLarge && fromMe"
      :uid="reply.author"
      style="align-self: flex-start; margin-left: -16px"
    />
  </div>
</template>

<style lang="sass">
.replyContent
  padding: 0 8px
  p
    font-size: 15px
</style>