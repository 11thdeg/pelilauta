<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { useContentRef } from '../../composables/useContentRef'
import { ContentEntryType } from '@11thdeg/skaldstore/dist/ContentEntry'
import { useSite } from '../../composables/useSite'
import BreadCrumbsNav from './BreadCrumbsNav.vue'
import PageBottomNav from './PageBottomNav.vue'

const props = defineProps<{
  page: ContentEntryType & { parentKey: string }
}>()
const { page } = toRefs(props)
const { site } = useSite()
const { content } = useContentRef(page)

const name = computed(() => (page.value as unknown as Record<string, string>).name)

const flowTime = computed(() => (page.value as unknown as Record<string, number>).flowTime)

</script>

<template>
  <article
    class="wd-large surface column"
  >
    <BreadCrumbsNav
      :site="site"
      :flow-time="flowTime"
      :name="name"
    />
    <div
      :innerHTML="content"
      class="contentArea"
    />
    <PageBottomNav :page="page" />
  </article>
</template>

<style scoped>
.contentArea {
  min-height: min(calc(var(--cn-page-grid) * 22), 50vh);
}
</style>
