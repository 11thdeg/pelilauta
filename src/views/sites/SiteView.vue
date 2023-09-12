<script lang="ts" setup>
import SiteFabs from '../../components/sites/SiteFabs/SiteFabs.vue'
import SiteTrayNew from '../../components/site/tray/SiteTray.vue'
import { useSite } from '../../composables/useSite'
import { usePage } from '../../composables/usePage'
import { computed, onMounted, watch } from 'vue'
import { useTitle } from '@vueuse/core'
import SiteFooter from '../../components/SiteFooter/SiteFooter.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'

import SiteFrontPageArticle from '../../components/site/SiteFrontPageArticle.vue'
import SiteAppBar from '../../components/site/appbar/SiteAppBar.vue'

const title = useTitle()

const { site, loading, notFound } = useSite()


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
  return `backgroundImage: url(${site.value.backgroundURL})`
})
</script>

<template>
  <div
    id="SiteView"
    :style="backgroundStyle"
    style="padding-left: 12px"
  >
    <SiteAppBar />
    <main class="bookLayout">
      <WithLoader :suspended="loading">
        <article
          v-if="notFound"
          class="Column large"
        >
          <EmptyCollection
            :noun="site?.systemBadge || 'mekanismi'"
            :title="$t('site.welcome.title')"
            :message="$t('site.welcome.message')"
          />
        </article>
        <SiteFrontPageArticle v-else />
        <SiteTrayNew />
      </WithLoader>
    </main>
    <SiteFooter />
    <SiteFabs />
  </div>
</template>