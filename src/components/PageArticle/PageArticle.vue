<script lang="ts" setup>
import { computed } from 'vue'
import { useContentEntry } from '../../composables/useContentEntry'
import { postProcessContent } from '../../utils/content/postProcessContent'

const props = defineProps<{
  page: {
    htmlContent?: string, 
    markdownContent?: string
  }
}>()

// eslint-disable-next-line vue/no-setup-props-destructure
const { content } = useContentEntry(
  props.page, 
  {
    default: '...'
  }
)

const processedContent = computed(() => {
  const c = postProcessContent(content.value)
  return c.outerHTML
})

</script>

<template>
  <article
    class="PageArticle Column large"
    :innerHTML="processedContent"
  />
</template>