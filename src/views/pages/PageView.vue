<script lang="ts" setup>
import SiteAppBar from '../../components/sites/SiteAppBar.vue'
import { usePage } from '../../composables/usePage'
import SiteFabs from '../../components/sites/SiteFabs.vue'
import NavigationTray from '../../components/NavigationTray/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'
import PageArticle from '../../components/pages/PageArticle.vue'
import { loadSite, useSite } from '../../composables/useSite'
import { watch } from 'vue'
import { useTitle } from '@vueuse/core'
import PageMetaColumn from '../../components/PageMetaColumn/PageMetaColumn.vue'
import SiteFooter from '../../components/SiteFooter/SiteFooter.vue'

const props = defineProps<{
  sitekey: string
  pagekey: string
}>()

// We need to load state from the server when the route changes
watch(props, () => {
  // init composable
  loadSite(props.sitekey)
  // init composable with sitekey and pagekey
  usePage(props.pagekey || '', props.sitekey)
}, { 
  immediate: true 
})

const { site } = useSite()
const { page } = usePage()
const title = useTitle()

watch(page, () => {
  if (page.value) {
    title.value = site.value?.name + '/' + page.value.name
  }
})

</script>

<template>
  <SiteAppBar
    :sitekey="sitekey"
    :pagekey="pagekey"
  />
  <main class="bookLayout">
    <PageArticle />
    <PageMetaColumn />
    <SiteFabs
      :pagekey="pagekey"
      :sitekey="sitekey"
    />
    <NavigationTray>
      <SiteTray />
    </NavigationTray>
  </main>
  <SiteFooter />
</template>