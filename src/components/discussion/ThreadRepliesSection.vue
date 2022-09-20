<script lang="ts" setup>
import { Entry, Reply } from '@11thdeg/skaldstore'
import { onMounted, onUnmounted, ref } from 'vue'
import { collection, getFirestore, onSnapshot } from '@firebase/firestore'
import { useSession } from '../../composables/useSession'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import ProfileTag from '../profiles/ProfileTag.vue'

const props = defineProps<{
  threadkey: string
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
          replies.value.push(new Reply(change.doc.data(), change.doc.id))
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
  <section>
    <div
      v-for="reply in replies"
      :key="reply.key"
      class="reply"
      :class="{ fromMe: reply.author === account.uid }"
    >
      <cyan-toolbar>
        <ProfileTag :uid="reply.author" />
        <cyan-toolbar />
        <FlowTimeCaption :flow-time="reply.flowTime" />
      </cyan-toolbar>>
      <MarkDownSection
        v-if="reply.markdownContent"
        :content="reply.markdownContent"
      />
      <div
        v-else
        :innerHTML="reply.htmlContent"
      />
    </div>
  </section>
</template>

<style lang="sass">
.reply
  background-color: var(--chroma-secondary-c)
  padding: 12px 16px
  border-radius: 8px
  position: relative
  margin-bottom: 24px
  &.fromMe
    background-color: var(--chroma-primary-b)

.reply:after
  content: ""
  width: 0px
  height: 0px
  position: absolute
  border-left: 12px solid var(--chroma-secondary-c)
  border-right: 6px solid transparent
  border-top: 6px solid var(--chroma-secondary-c)
  border-bottom: 12px solid transparent
  left: 32px
  bottom: -18px
.reply.fromMe:after
  border-right: 12px solid var(--chroma-primary-b)
  border-left: 6px solid transparent
  border-top: 6px solid var(--chroma-primary-b)
  border-bottom: 12px solid transparent
  left: calc(100% - 48px)
</style>