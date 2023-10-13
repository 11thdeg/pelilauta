<script lang="ts" setup>
import { Page } from '@11thdeg/skaldstore'
import { useTitle } from '../composables/useTitle'
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SiteMetaDataColumn from '../components/SiteMetaDataColumn.vue'
import WithLoader from '../components/ui/WithLoader.vue'
import { useContentEntry } from '../composables/useContentEntry'
import { fetchPage } from '../composables/usePages'
import ShareButton from '../components/ShareButton/ShareButton.vue'

const { t } = useI18n()
const { title } = useTitle()
const page = ref(new Page())
const loading = ref(true)

onMounted(async () => {
  title.value = t('about.title')
  page.value = await fetchPage('mekanismi', 'pelilauta-about') || new Page()
  loading.value = false
})

const pageTitle = computed(() => {
  if (page.value.name) return page.value.name
  return t('app.title')
})

const content = computed(() => {
  return useContentEntry(page.value).content.value
})
</script>

<template>
  <div>
    <!-- For the App front page, we use the app-bar defaults! -->
    <cn-app-bar
      noun="pelilauta"
      :title="pageTitle"
    >
      <ShareButton />
    </cn-app-bar>
    <main
      v-if="page.name"
      class="container"
    >
      <WithLoader :suspended="loading">
        <article
          class="wd-large auto column"
          :innerHTML="content"
        />
      </WithLoader>
      <SiteMetaDataColumn />
    </main>
  </div>
</template>