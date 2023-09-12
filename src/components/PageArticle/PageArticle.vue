<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { useContentRef } from '../../composables/useContentRef'
import { ContentEntryType } from '@11thdeg/skaldstore/dist/ContentEntry'
import { useSite } from '../../composables/useSite'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'

const props = defineProps<{
  page: ContentEntryType
}>()
const { page } = toRefs(props)
const { site } = useSite()
const { content } = useContentRef(page)

const name = computed(() => (page.value as unknown as Record<string, string>).name)

const flowTime = computed(() => (page.value as unknown as Record<string, number>).flowTime)

</script>

<template>
  <article
    class="PageArticle Column large"
  >
    <div class="flex space-between">
      <p class="TypeBody2">
        <RouterLink :to="`/sites/${site.key}`">
          {{ site.name }} 
        </RouterLink> 
        /
        <RouterLink :to="`/sites/${site.key}/pages/${page.key}`">
          {{ name }}
        </RouterLink>
      </p>
      <FlowTimeCaption :flow-time="flowTime" />
    </div>
    <div :innerHTML="content" />
  </article>
</template>

<style scoped>
.PageArticle {
  background: var(--chroma-surface);
  padding: var(--cn-padding);
  border-radius: 12px;
}
</style>