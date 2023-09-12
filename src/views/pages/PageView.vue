<script lang="ts" setup>
import { usePage, loadPage } from '../../composables/usePage'
import SiteFabs from '../../components/sites/SiteFabs/SiteFabs.vue'
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
import SiteTray from '../../components/site/tray/SiteTray.vue'
import SiteAppBar from '../../components/site/appbar/SiteAppBar.vue'

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

const backgroundStyle = computed(() =>{
  if(!site.value.backgroundURL) return
  return `backgroundImage: url(${site.value.backgroundURL})`
})
</script>

<template>
  <div
    :style="backgroundStyle"
    style="padding-left: 12px"
  >
    <SiteAppBar />
    <main class="bookLayout">
      <WithLoader :suspended="loading">
        <SiteTray />
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
    <SiteFooter />
  </div>
</template>