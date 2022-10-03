<script lang="ts" setup>
import { Page } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePages } from '../../composables/usePages'
import MarkdownSection from '../content/MarkdownSection.vue'
import EmptyCollection from '../ui/EmptyCollection.vue'

const props = defineProps<{
  sitekey: string
  pagekey: string
}>()

const { t } = useI18n()
const { pages, loading } = usePages()

const page = computed(() => {
  return pages.value.find((p) => p.key === props.pagekey) || new Page()
})

</script>

<template>
  <article class="Column double">
    <cyan-loader
      v-if="loading"
      large
    />
    <template v-else>
      <EmptyCollection
        v-if="!page.markdownContent"
        noun="idea"
        title="o_O"
        :message="'404 – ' + pagekey + ' - ' + t('page.empty.message')"
      >
        <cyan-button
          :label="t('action.edit')"
          noun="edit"
          text
          @click="$router.push(`/sites/${props.sitekey}/pages/${props.pagekey || props.sitekey}/edit`)"
        />
      </EmptyCollection>
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
    </template>
  </article>
</template>