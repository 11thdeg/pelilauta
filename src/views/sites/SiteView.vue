<script lang="ts" setup>
import SiteFabs from '../../components/sites/SiteFabs/SiteFabs.vue'
import NavigationTray from '../../components/NavigationTray/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'
import { useSite } from '../../composables/useSite'
import { usePage } from '../../composables/usePage'
import { computed, onMounted, watch } from 'vue'
import { useTitle } from '@vueuse/core'
import SiteChangesListColumn from '../../components/SiteChangesListColumn/SiteChangesListColumn.vue'
import SiteFooter from '../../components/SiteFooter/SiteFooter.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import LoveASiteButton from '../../components/SiteCard/LoveASiteButton.vue'
import ShareButton from '../../components/ShareButton/ShareButton.vue'
import { useUxState } from '../../composables/useUXState'
import SiteFrontPageArticle from '../../components/site/SiteFrontPageArticle.vue'

const title = useTitle()

const { site, loading, notFound } = useSite()
const { toggleMobileNavTray } = useUxState()

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
  >
    <cn-app-bar
      id="TopBar"
      :title="site.name"
      sticky
      :noun="site?.systemBadge || 'mekanismi'"
      menu
      @menu="toggleMobileNavTray"
    >
      <LoveASiteButton
        v-if="site"
        :site="site"
      />
      <ShareButton />
    </cn-app-bar>

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
      </WithLoader>
      <SiteChangesListColumn />
    </main>
    <SiteFooter />
    <SiteFabs />
    <NavigationTray>
      <SiteTray />
    </NavigationTray>
  </div>
</template>