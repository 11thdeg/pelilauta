<script lang="ts" setup>
import { Reply } from '@11thdeg/skaldstore'
import { onMounted, onUnmounted, ref } from 'vue'
import { collection, getFirestore, onSnapshot } from '@firebase/firestore'
import { stashReply } from '../../composables/useDiscussion'
import ReplyBubble from '../replyBubble/ReplyBubble.vue'

const props = defineProps<{
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
        if (!a) return 1
        if (!b) return -1
        if (a.flowTime || 0 < b.flowTime || 0) return 1
        if (a.flowTime  || 0 > b.flowTime || 0) return -1
        return 0
      })
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