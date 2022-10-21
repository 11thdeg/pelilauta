<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import SiteFabs from '../../components/sites/SiteFabs.vue'
import SiteAppBar from '../../components/sites/SiteAppBar.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'
import { loadSite, useSite } from '../../composables/useSite'
import { loadPage } from '../../composables/usePage'
import { watch } from 'vue'
import PageArticle from '../../components/pages/PageArticle.vue'
import { computed } from 'vue'

const props = defineProps<{
  sitekey: string
}>()

loadSite(props.sitekey)
// Load site default page
loadPage(props.sitekey, props.sitekey)

const { site } = useSite()
const s = computed (() => site.value || new Site())

watch(s, (ns) => {
  if (ns) {
    const pageKey = ns.homepage || props.sitekey
    loadPage(pageKey, props.sitekey)
  }
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