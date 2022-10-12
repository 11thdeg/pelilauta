<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import { fetchSite } from '../../composables/useSites'
import PageContentArticle from '../../components/pages/PageContentArticle.vue'
import { usePages } from '../../composables/usePages'
import { useI18n } from 'vue-i18n'
import SiteFabs from '../../components/sites/SiteFabs.vue'
import SiteAppBar from '../../components/sites/SiteAppBar.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'

const props = defineProps<{
  sitekey: string
}>()

const site = ref(new Site())
const { t } = useI18n()

onMounted(async () => {
  usePages(props.sitekey)
  site.value = await fetchSite(props.sitekey) || new Site()
})

const { pages } = usePages(props.sitekey)

</script>

<template>
  <div id="SiteView">
    <SiteAppBar :sitekey="sitekey" />
    <main class="bookLayout">
      <PageContentArticle
        :pagekey="site.homepage"
        :sitekey="sitekey"
      />
    </main>
    <SiteFabs :sitekey="sitekey" />
    <NavigationTray>
      <SiteTray />
    </NavigationTray>
  </div>
</template>