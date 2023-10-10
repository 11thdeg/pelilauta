<script lang="ts" setup>
import { usePage, loadPage } from '../../composables/usePage'
import SiteFabs from '../../components/sites/SiteFabs/SiteFabs.vue'
import PageArticle from '../../components/PageArticle/PageArticle.vue'
import { useSite } from '../../composables/useSite'
import { watch } from 'vue'
import { useTitle } from '@vueuse/core'
import SiteFooter from '../../components/SiteFooter/SiteFooter.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import { computed } from 'vue'
import SiteTray from '../../components/site/tray/SiteTray.vue'
import SiteAppBar from '../../components/site/appbar/SiteAppBar.vue'

const props = defineProps<{
  sitekey: string
  pagekey: string
}>()

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
    <main>
      <WithLoader :suspended="loading">
        <div class="container">
          <SiteTray />
          <PageArticle
            v-if="page"
            :page="page"
          />
        </div>
      </withloader>
      <SiteFabs
        :pagekey="pagekey"
        :sitekey="sitekey"
      />
      <SiteFooter />
    </main>
  </div>
</template>