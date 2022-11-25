<script lang="ts" setup>
import SiteAppBar from '../../components/sites/SiteAppBar.vue'
import { loadPage } from '../../composables/usePage'
import SiteFabs from '../../components/sites/SiteFabs.vue'
import NavigationTray from '../../components/NavigationTray/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'
import PageArticle from '../../components/pages/PageArticle.vue'
import { loadSite } from '../../composables/useSite'
import { watch } from 'vue'

const props = defineProps<{
  sitekey: string
  pagekey: string
}>()

// We need to load state from the server when the route changes
watch(props, () => {
  // init composable
  loadSite(props.sitekey)
  // init composable with sitekey and pagekey
  loadPage(props.pagekey || '', props.sitekey)
}, { 
  immediate: true 
})

</script>

<template>
  <SiteAppBar
    :sitekey="sitekey"
    :pagekey="pagekey"
  />
  <main class="bookLayout">
    <PageArticle />
    <SiteFabs
      :pagekey="pagekey"
      :sitekey="sitekey"
    />
    <NavigationTray>
      <SiteTray />
    </NavigationTray>
  </main>
</template>