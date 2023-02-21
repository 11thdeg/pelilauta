<script lang="ts" setup>
import { useContentEntry } from '../../composables/useContentEntry'

const props = defineProps<{
  page: {
    htmlContent?: string, 
    markdownContent?: string
  }
}>()

const { content } = useContentEntry(
  props.page, 
  {
    default: '...'
  }
)
</script>

<template>
  <article
    class="PageArticle Column large"
    :innerHTML="content"
  />
</template>