<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ReplyToThreadSection from '../replyFrom/ReplyForm.vue'
import ThreadRepliesSection from './ThreadRepliesSection.vue'
    
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
      threadkey: string
    }>()
    
const t = useI18n().t
const pushQuote = ref(new Array<string>())
</script>
    
<template>
  <article>
    <h2>{{ t('discourse.title') }}</h2>
    <ThreadRepliesSection
      :threadkey="threadkey"
      @update:quote="pushQuote = $event"
    />
    <ReplyToThreadSection
      :threadkey="threadkey"
      :quote="pushQuote"
    />
  </article>
</template>