<script lang="ts" setup>
import { computed } from 'vue'
import { marked } from 'marked'
const props = defineProps<{
      content: string
    }>()
marked.setOptions({
  gfm: true,
  smartLists: true,
  smartypants: true
})
const rendered = computed(() => {
  return marked(props.content)
})
</script>
<template>
  <section :innerHTML="rendered" />
</template>