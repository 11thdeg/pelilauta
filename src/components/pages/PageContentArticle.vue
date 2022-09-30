<script lang="ts" setup>
import { Page } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { usePages } from '../../composables/usePages'
import MarkdownSection from '../content/MarkdownSection.vue'

const props = defineProps<{
  pagekey: string
}>()

const { pages } = usePages()

const page = computed(() => {
  return pages.value.find((p) => p.key === props.pagekey) || new Page()
})

</script>

<template>
  <article class="Column double">
    <cyan-loader
      v-if="!page.name"
      large
    />
    <template v-else>
      <h1>{{ page.name }}</h1>
      <MarkdownSection
        v-if="page?.markdownContent"
        :content="page.markdownContent"
      />
      <div
        v-else
        :innerHTML="page.htmlContent"
      />
    </template>
  </article>
</template>