<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { usePage } from '../../composables/usePage'
import { useSite } from '../../composables/useSite'
import EmptyCollection from '../ui/EmptyCollection.vue'
import MarkdownSection from '../content/MarkdownSection.vue'
import { useScreenSize } from '../../composables/useScreenSize'

const { t } = useI18n()
const { page, loading, notFound } = usePage()
const { key } = useSite()

const { isLarge } = useScreenSize()
</script>

<template>
  <article
    class="Column"
    :class="{
      double: isLarge,
      'double-cut': !isLarge
    }"
  >
    <template v-if="loading">
      <cyan-loader large />
    </template>
    <template v-else-if="notFound">
      <EmptyCollection
        noun="page"
        :title="t('page.notFound.title')"
        :message="t('page.notFound.message')"
      >
        <cyan-button
          :label="t('action.add.new')"
          noun="page"
          text
          @click="$router.push(`/sites/${key}/add/page`)"
        />
      </EmptyCollection>
    </template>
    <template v-else-if="page">
      <h1>{{ page.name }}</h1>
      <MarkdownSection
        v-if="page.markdownContent"
        :content="page.markdownContent"
      />
      <div
        v-else
        :innerHTML="page.htmlContent"
      />
    </template>
  </article>
</template>