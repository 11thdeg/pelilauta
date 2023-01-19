<script lang="ts" setup>
import { Page } from '@11thdeg/skaldstore'
import { useTitle } from '@vueuse/core'
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppBar from '../components/navigation/AppBar.vue'
import SiteMetaDataColumn from '../components/SiteMetaDataColumn.vue'
import WithLoader from '../components/ui/WithLoader.vue'
import { useContentEntry } from '../composables/useContentEntry'
import { fetchPage } from '../composables/usePages'

const { t } = useI18n()
const title = useTitle()
const page = ref(new Page())
const loading = ref(true)

onMounted(async () => {
  title.value = t('app.title') + ' / ' + t('about.title')
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
    <AppBar :title="pageTitle" />
    <main
      v-if="page.name"
      class="bookLayout"
    >
      <WithLoader :suspended="loading">
        <article
          class="large Column"
          :innerHTML="content"
        />
      </WithLoader>
      <SiteMetaDataColumn />
    </main>
  </div>
</template>