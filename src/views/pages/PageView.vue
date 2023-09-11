<script lang="ts" setup>
import { usePage, loadPage } from '../../composables/usePage'
import SiteFabs from '../../components/sites/SiteFabs/SiteFabs.vue'
import NavigationTray from '../../components/NavigationTray/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'
import PageArticle from '../../components/PageArticle/PageArticle.vue'
import { useSite } from '../../composables/useSite'
import { watch } from 'vue'
import { useTitle } from '@vueuse/core'
import PageMetaColumn from '../../components/PageMetaColumn/PageMetaColumn.vue'
import SiteFooter from '../../components/SiteFooter/SiteFooter.vue'
import CopyPageMarkdownLinkButton from '../../components/CopyPageMarkdownLinkButton/CopyPageMarkdownLinkButton.vue'
import DownloadAsMarkdownButton from '../../components/DownloadAsMarkdownButton/DownloadAsMarkdownButton.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import ShareButton from '../../components/ShareButton/ShareButton.vue'
import { computed } from 'vue'
import { useScreenSize } from '../../composables/useScreenSize'

const props = defineProps<{
  sitekey: string
  pagekey: string
}>()

const { isSmall } = useScreenSize()
const { site } = useSite()
const { page, loading } = usePage()
const title = useTitle()

// We need to load state from the server when the route changes
watch(props, (p) => {
  // init composable with sitekey and pagekey
  loadPage(p.pagekey, p.sitekey)
}, { 
  immediate: true 
})

// Update the title when the page is loaded
watch(page, () => {
  if (page.value) {
    title.value = site.value?.name + '/' + page.value.name
  }
})

const noun = computed(() => {
  if (!isSmall.value) {
    return undefined
  }
  if (site.value?.systemBadge) {
    return site.value.systemBadge
  }
  return 'pelilauta'
})

const pageTitle = computed(() => {
  if (page.value) {
    return page.value.name
  }
  return '...'
})

</script>

<template>
  <cn-app-bar 
    :noun="noun"
    :title="pageTitle"
    sticky
  >
    <CopyPageMarkdownLinkButton
      v-if="page"
      :page="page"
    />
    <DownloadAsMarkdownButton
      v-if="page"
      :content-entry="page"
    />
    <ShareButton />
  </cn-app-bar>
  <main class="bookLayout">
    <WithLoader :suspended="loading">
      <PageArticle
        v-if="page"
        :page="page"
      />
      <PageMetaColumn
        v-if="page && site"
        :page="page"
        :site="site"
      />
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