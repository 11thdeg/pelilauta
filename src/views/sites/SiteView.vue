<script lang="ts" setup>
import SiteFabs from '../../components/sites/SiteFabs.vue'
import SiteAppBar from '../../components/sites/SiteAppBar.vue'
import NavigationTray from '../../components/NavigationTray/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'
import { loadSite, useSite } from '../../composables/useSite'
import { usePage } from '../../composables/usePage'
import { onMounted, watch } from 'vue'
import PageArticle from '../../components/pages/PageArticle.vue'
import { useTitle } from '@vueuse/core'
import SiteThreadListColumn from '../../components/SiteThreadListColumn/SiteThreadListColumn.vue'

const props = defineProps<{
  sitekey: string
}>()

const { site } = useSite()
const title = useTitle()

onMounted(() => {
  loadSite(props.sitekey)
  watch(site, (ns) => {
    if (ns) {
      const pageKey = ns.homepage || ns.key || ''
      usePage(pageKey, props.sitekey)
      title.value = ns.name
    }
  }, { immediate: true })
})


</script>

<template>
  <div id="SiteView">
    <SiteAppBar :sitekey="sitekey" />
    <main class="bookLayout">
      <PageArticle />
      <SiteThreadListColumn :sitekey="sitekey" />
    </main>
    <SiteFabs :sitekey="sitekey" />
    <NavigationTray>
      <SiteTray />
    </NavigationTray>
  </div>
</template>