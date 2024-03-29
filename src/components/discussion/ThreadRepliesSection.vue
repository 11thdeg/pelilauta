<script lang="ts" setup>
import { Reply } from '@11thdeg/skaldstore'
import { onMounted, onUnmounted, ref } from 'vue'
import { collection, getFirestore, onSnapshot } from '@firebase/firestore'
import { stashReply } from '../../composables/useDiscussion'
import ReplyBubble from '../replyBubble/ReplyBubble.vue'

const props = defineProps<{
  flowtime?: number
  threadkey: string
}>()
const emit = defineEmits<{
  (e: 'update:quote', keys: string[]): void
}>()

const replies = ref(new Array<Reply>())

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
          // data.lovers = (data.lovers && Array.isArray(data.lovers)) ? data.lovers : []
          // logDebug('DANGEROUSLY FIXING A BUG INSIDE skaldbase/reply.ts', data.lovers)
          const reply = new Reply(data, change.doc.id)
          replies.value.push(reply)
          stashReply(reply)
        }
        if (change.type === 'modified') {
          const index = replies.value.findIndex((reply) => reply.key === change.doc.id)
          if (index >= 0) replies.value[index] = new Reply(change.doc.data(), change.doc.id)
        }
        if (change.type === 'removed') {
          const index = replies.value.findIndex((reply) => reply.key === change.doc.id)
          if (index >= 0) replies.value.splice(index, 1)
        }
      })
      replies.value.sort((a, b) => {
        const asec = a.createdAt?.seconds || 0
        const bsec = b.createdAt?.seconds || 0
        return asec - bsec
      })
      if(props.flowtime) {
        let forwardtoKey = replies.value[replies.value.length - 1].key 
        for (let i = replies.value.length - 1; i >= 0; i--) {
          if (replies.value[i].flowTime < props.flowtime) {
            forwardtoKey = replies.value[i].key
            break
          }
        }
        location.hash = '#reply_' + forwardtoKey
      }
    })
})
onUnmounted(() => {
  if (unsubscribeToDiscussion) {
    unsubscribeToDiscussion()
  }
})
</script>

<template>
  <section class="flex flex-column">
    <ReplyBubble
      v-for="reply in replies"
      :id="'reply_'+reply.key"
      :key="reply.key"
      :reply="reply"
      :threadkey="threadkey"
      @update:quote="emit('update:quote', $event)"
    />
  </section>
</template>