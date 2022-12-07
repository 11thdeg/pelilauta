<script lang="ts" setup>
import { Page } from '@11thdeg/skaldstore'
import { useTitle } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MarkdownSection from '../components/content/MarkdownSection.vue'
import AppBar from '../components/navigation/AppBar.vue'
import SiteMetaDataColumn from '../components/SiteMetaDataColumn.vue'
import { fetchPage } from '../composables/usePages'

const { t } = useI18n()
const title = useTitle()
const page = ref(new Page())

onMounted(async () => {
  title.value = t('app.title') + ' / ' + t('about.title')
  page.value = await fetchPage('mekanismi', 'pelilauta-about') || new Page()
})

</script>
<template>
  <main>
    <AppBar />
    <main
      v-if="page.name"
      class="bookLayout"
    >
      <article class="large Column">
        <h1>{{ page.name }}</h1>
        <MarkdownSection 
          v-if="page.markdownContent"
          :content="page.markdownContent"
        />
        <div
          v-else
          :innerHTML="page.htmlContent"
        />
      </article>
      <SiteMetaDataColumn />
    </main>
  </main>
</template>