<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { usePages } from '../../composables/usePages'
import { useSite } from '../../composables/useSite'

const { t } = useI18n()
const { site, chapters } = useSite()
const { pages } = usePages()

function pagesForChapter(slug: string) {
  return pages.value.filter(page => page.category === slug).sort((a, b) => a.name > b.name ? -1 : 1)
}
</script>

<template>
  <article
    v-if="site"
    class="Column chroma-box-a"
    style="padding: 12px 16px"
  >
    <h3>{{ site.name }}</h3>
    <p class="TypeBody2">
      {{ site.description }}
    </p>
    <template
      v-for="c in chapters"
      :key="c.slug"
    >
      <h4>{{ c.name }}</h4>
      <p
        v-for="page in pagesForChapter(c.slug)"
        :key="page.key"
      >
        <router-link :to="`/sites/${site.key}/pages/${page.key}`">
          {{ page.name }}
        </router-link>
      </p>
      <p v-if="pagesForChapter(c.slug).length < 1">
        - 
      </p>
    </template>
    <h4 v-if="pagesForChapter('').length > 0">
      {{ t('sidebar.noChapter') }}
    </h4>
    <p
      v-for="page in pagesForChapter('')"
      :key="page.key"
    >
      <router-link :to="`/sites/${site.key}/pages/${page.key}`">
        {{ page.name }}
      </router-link>
    </p>
  </article>
</template>