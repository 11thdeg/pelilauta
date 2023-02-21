<script lang="ts" setup>
import { usePage } from '../../composables/usePage'
import SiteFabs from '../../components/sites/SiteFabs.vue'
import NavigationTray from '../../components/NavigationTray/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'
import PageArticle from '../../components/PageArticle/PageArticle.vue'
import { loadSite, useSite } from '../../composables/useSite'
import { watch } from 'vue'
import { useTitle } from '@vueuse/core'
import PageMetaColumn from '../../components/PageMetaColumn/PageMetaColumn.vue'
import SiteFooter from '../../components/SiteFooter/SiteFooter.vue'
import AppBar from '../../components/navigation/AppBar.vue'
import CopyPageMarkdownLinkButton from '../../components/CopyPageMarkdownLinkButton/CopyPageMarkdownLinkButton.vue'
import DownloadAsMarkdownButton from '../../components/DownloadAsMarkdownButton/DownloadAsMarkdownButton.vue'
import WithLoader from '../../components/ui/WithLoader.vue'

const props = defineProps<{
  sitekey: string
  pagekey: string
}>()

// We need to load state from the server when the route changes
watch(props, (p) => {
  // init composable
  loadSite(p.sitekey)
  // init composable with sitekey and pagekey
  usePage(p.pagekey || '', p.sitekey)
}, { 
  immediate: true 
})

const { site } = useSite()
const { page, loading } = usePage()
const title = useTitle()

watch(page, () => {
  if (page.value) {
    title.value = site.value?.name + '/' + page.value.name
  }
})

</script>

<template>
  <AppBar
    :title="page?.name || '...'"
  >
    <CopyPageMarkdownLinkButton />
    <DownloadAsMarkdownButton
      v-if="page"
      :content-entry="page"
    />
  </AppBar>
  <main class="bookLayout">
    <WithLoader :suspended="loading">
      <PageArticle
        v-if="page"
        :page="page"
      />
      <PageMetaColumn />
    </WithLoader>
  </main>
  <SiteFabs
    :pagekey="pagekey"
    :sitekey="sitekey"
  />
  <NavigationTray>
    <SiteTray />
  </NavigationTray>
  <SiteFooter />
</template>