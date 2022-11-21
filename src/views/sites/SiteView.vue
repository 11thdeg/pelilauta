<script lang="ts" setup>
import SiteFabs from '../../components/sites/SiteFabs.vue'
import SiteAppBar from '../../components/sites/SiteAppBar.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'
import { loadSite, useSite } from '../../composables/useSite'
import { loadPage } from '../../composables/usePage'
import { onMounted, watch } from 'vue'
import PageArticle from '../../components/pages/PageArticle.vue'

const props = defineProps<{
  sitekey: string
}>()

const { site } = useSite()

onMounted(() => {
  loadSite(props.sitekey)
  watch(site, (ns) => {
    if (ns) {
      const pageKey = ns.homepage || ns.key || ''
      loadPage(pageKey, props.sitekey)
    }
  }, { immediate: true })
})


</script>

<template>
  <div id="SiteView">
    <SiteAppBar :sitekey="sitekey" />
    <main class="bookLayout">
      <PageArticle />
    </main>
    <SiteFabs :sitekey="sitekey" />
    <NavigationTray>
      <SiteTray />
    </NavigationTray>
  </div>
</template>