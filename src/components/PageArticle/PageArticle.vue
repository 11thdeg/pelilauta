<script lang="ts" setup>
import { toRefs } from 'vue'
import { useContentRef } from '../../composables/useContentRef'
import { ContentEntryType } from '@11thdeg/skaldstore/dist/ContentEntry'

const props = defineProps<{
  page: ContentEntryType
}>()
const { page } = toRefs(props)
const { content } = useContentRef(page)

</script>

<template>
  <article
    class="PageArticle Column large"
    :innerHTML="content"
  />
</template>

<style scoped>
.PageArticle {
  background: var(--chroma-surface);
  padding: var(--cn-padding);
  border-radius: 12px;
}
</style>