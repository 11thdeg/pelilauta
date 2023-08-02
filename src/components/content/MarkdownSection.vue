<script lang="ts" setup>
import { computed } from 'vue'
import { marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'

const props = defineProps<{
      content: string
    }>()
marked.setOptions({
  gfm: true,
  smartypants: false,
  mangle: false
})
marked.use(gfmHeadingId({
  prefix: 'heading-'
}))
const rendered = computed(() => {
  return marked(props.content)
})
</script>
<template>
  <section :innerHTML="rendered" />
</template>