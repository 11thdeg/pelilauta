<script lang="ts" setup>
import SiteFabs from '../../components/sites/SiteFabs/SiteFabs.vue'
import SiteTrayNew from '../../components/site/tray/SiteTray.vue'
import { useSite } from '../../composables/useSite'
import { usePage } from '../../composables/usePage'
import { computed, onMounted, watch } from 'vue'
import { useTitle } from '@vueuse/core'
import SiteFooter from '../../components/SiteFooter/SiteFooter.vue'
import WithLoader from '../../components/ui/WithLoader.vue'

import SiteFrontPageArticle from '../../components/site/SiteFrontPageArticle.vue'
import SiteAppBar from '../../components/site/appbar/SiteAppBar.vue'

const title = useTitle()

const { site, loading } = useSite()


onMounted(() => {
  watch(site, (ns) => {
    useTitle().value = ns?.name || '404'
    if (ns) {
      const pageKey = ns.homepage || ns.key || ''
      usePage(pageKey, ns.key)
      title.value = ns.name
    }
  }, { immediate: true })
})

const backgroundStyle = computed(() =>{
  if(!site.value.backgroundURL) return
  const size = site.value.backgroundSize === 'repeat' ? `backgroundRepeat: ${site.value.backgroundSize}` :
    `backgroundSize: ${site.value.backgroundSize}; backgroundRepeat: no-repeat; backgroundPosition: top center`
  return `${size};backgroundImage: url(${site.value.backgroundURL})`
})
</script>

<template>
  <div
    id="SiteView"
    :style="backgroundStyle"
    style="padding-left: 12px"
  >
    <SiteAppBar />
    <WithLoader :suspended="loading">
      <div class="cn-app-content">
        <main class="container">
          <SiteTrayNew />
          <SiteFrontPageArticle />
        </main>
        <SiteFooter />
      </div>  
      <SiteFabs />
    </WithLoader>
  </div>
</template>

<style lang="sass">
#SiteView
  min-height: 100vh
</style>