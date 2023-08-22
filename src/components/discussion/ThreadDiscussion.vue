<script lang="ts" setup>
import { ref } from 'vue'
import ReplyToThreadSection from '../replyFrom/ReplyForm.vue'
import ThreadRepliesSection from './ThreadRepliesSection.vue'
    
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  flowtime?: number
      threadkey: string
    }>()
    
const pushQuote = ref(new Array<string>())
</script>
    
<template>
  <article style="margin-top: 48px">
    <h2 class="downscaled">
      {{ $t('discourse.title') }}
    </h2>
    <ThreadRepliesSection
      :flowtime="flowtime"
      :threadkey="threadkey"
      @update:quote="pushQuote = $event"
    />
    <ReplyToThreadSection
      :threadkey="threadkey"
      :quote="pushQuote"
    />
  </article>
</template>