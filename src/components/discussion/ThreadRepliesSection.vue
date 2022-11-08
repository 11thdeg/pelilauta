<script lang="ts" setup>
import { Entry, Reply } from '@11thdeg/skaldstore'
import { onMounted, onUnmounted, ref } from 'vue'
import { collection, getFirestore, onSnapshot } from '@firebase/firestore'
import { useSession } from '../../composables/useSession'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import ProfileTag from '../profiles/ProfileTag.vue'
import MarkdownSection from '../content/MarkdownSection.vue'
import { stashReply } from '../../composables/useDiscussion'
import QuotedResponseSection from './QuotedResponseSection.vue'
import ImageListSection from '../content/ImageListSection.vue'
import LoveAReplyTag from './LoveAReplyTag.vue'
import { logDebug } from '../../utils/logHelpers'

const props = defineProps<{
  threadkey: string
}>()
const emit = defineEmits<{
  (e: 'update:quote', keys: string[]): void
}>()

const replies = ref(new Array<Reply>())
const { account } = useSession()

let unsubscribeToDiscussion:undefined|CallableFunction = undefined

onMounted(async () => {
  unsubscribeToDiscussion = onSnapshot(
    collection(
      getFirestore(),
      'stream',
      props.threadkey,
      'comments'
    ), 
    async (snapshot) => {
      if (snapshot.empty) {
        return
      }
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data()
          data.lovers = (data.lovers && Array.isArray(data.lovers)) ? data.lovers : []
          logDebug('DANGEROUSLY FIXING A BUG INSIDE skaldbase/reply.ts', data.lovers)
          const reply = new Reply(data, change.doc.id)
          replies.value.push(reply)
          stashReply(reply)
        }
        if (change.type === 'modified') {
          const index = replies.value.findIndex((reply) => reply.key === change.doc.id)
          if (index >= 0) replies.value[index] = new Reply(change.doc.data(), change.doc.id)
        }
      })
      replies.value.sort((a, b) => b.compareFlowTime(a as unknown as Entry))
    })
})
onUnmounted(() => {
  if (unsubscribeToDiscussion) {
    unsubscribeToDiscussion()
  }
})
</script>

<template>
  <section class="verticalList">
    <cyan-bubble
      v-for="reply in replies"
      :id="'reply_'+reply.key"
      :key="reply.key"
      :reply="reply.author === account.uid"
    >
      <cyan-toolbar small>
        <ProfileTag :uid="reply.author" />
        <FlowTimeCaption :flow-time="reply.flowTime" />
        <cyan-spacer />
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
      <ImageListSection
        v-if="reply.images"
        :images="reply.images"
      />
      
      <QuotedResponseSection
        v-if="reply.quoteRef"
        style="margin: 12px"
        :threadkey="threadkey"
        :replykey="reply.quoteRef"
      />
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
  </section>
</template>