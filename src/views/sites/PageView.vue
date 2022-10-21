<script lang="ts" setup>
import SiteAppBar from '../../components/sites/SiteAppBar.vue'
import { loadPage } from '../../composables/usePage'
import SiteFabs from '../../components/sites/SiteFabs.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'
import PageArticle from '../../components/pages/PageArticle.vue'

const props = defineProps<{
  sitekey: string
  pagekey: string
}>()

// init composable with sitekey and pagekey
loadPage(props.pagekey, props.sitekey)

</script>

<template>
  <SiteAppBar
    :sitekey="sitekey"
    :pagekey="pagekey"
    sticky
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