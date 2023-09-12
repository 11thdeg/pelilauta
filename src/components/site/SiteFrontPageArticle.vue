<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useSite } from '../../composables/useSite'
import { fetchPage } from '../../composables/usePages'
import PageArticle from '../PageArticle/PageArticle.vue'
import { Page } from '@11thdeg/skaldstore'
import { logDebug } from '../../utils/logHelpers'
import EmptyCollection from '../ui/EmptyCollection.vue'

const { site } = useSite()
const loading = ref(false)
const notFound = ref(false)
const page = ref(new Page())

onMounted(async () => {
  watch(site, async (s) => {
    if (!s) return
    loading.value = true
    logDebug('SiteFrontPageArticle', 'fetching page', s.homepage)
    const p = await fetchPage(s.key, s.homepage)
    if (p) {
      page.value = p
      logDebug('SiteFrontPageArticle', 'page found', s.homepage)
      notFound.value = false
    } else {
      const fallBack = await fetchPage(s.key, s.key)
      if (fallBack) {
        page.value = fallBack
        logDebug('SiteFrontPageArticle', 'fall back page found', s.key)
      } else {
        page.value = new Page()
        logDebug('SiteFrontPageArticle', 'page not found', s.homepage)
        notFound.value = true
      }
    }
    loading.value = false
  }, { immediate: true })
})
</script>

<template>
  <article
    v-if="notFound && !loading"
    class="column large surface"
  >
    <EmptyCollection
    
      :noun="site.systemBadge"
      :title="$t('site.welcome.title')"
      :message="$t('site.welcome.message')"
    />
  </article>
  <PageArticle
    v-if="!loading && !notFound"
    :page="page"
  />
</template>