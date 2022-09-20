<script lang="ts" setup>
    import { useI18n } from 'vue-i18n'
    import ReplyToThreadSection from './ReplyToThreadSection.vue'
    import ThreadRepliesSection from './ThreadRepliesSection.vue'
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const props = defineProps<{
      threadkey: string
    }>()
    
    const t = useI18n().t
    </script>
    
<template>
  <article>
    <h2>{{ t('discourse.title') }}</h2>
    <ThreadRepliesSection :threadkey="threadkey" />
    <ReplyToThreadSection :threadkey="threadkey" />
  </article>
</template>