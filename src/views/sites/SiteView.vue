<script lang="ts" setup>
import SiteFabs from '../../components/sites/SiteFabs.vue'
import NavigationTray from '../../components/NavigationTray/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'
import { loadSite, useSite } from '../../composables/useSite'
import { usePage } from '../../composables/usePage'
import { onMounted, watch } from 'vue'
import PageArticle from '../../components/PageArticle/PageArticle.vue'
import { useTitle } from '@vueuse/core'
import SiteChangesListColumn from '../../components/SiteChangesListColumn/SiteChangesListColumn.vue'
import SiteFooter from '../../components/SiteFooter/SiteFooter.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import LoveASiteButton from '../../components/SiteCard/LoveASiteButton.vue'
import ShareButton from '../../components/ShareButton/ShareButton.vue'
import { useUxState } from '../../composables/useUXState'

const props = defineProps<{
  sitekey: string
}>()

const { site } = useSite()
const { loading, notFound, page } = usePage()
const title = useTitle()
const { toggleMobileNavTray } = useUxState()

onMounted(() => {
  loadSite(props.sitekey)
  watch(site, (ns) => {
    useTitle().value = ns?.name || '404'
    if (ns) {
      const pageKey = ns.homepage || ns.key || ''
      usePage(pageKey, ns.key)
      title.value = ns.name
    }
  }, { immediate: true })
})
</script>

<template>
  <div id="SiteView">
    <cn-app-bar
      id="TopBar"
      :title="site?.name || '...'"
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
        <PageArticle
          v-else-if="page"
          :page="page"
        />
      </WithLoader>
      <SiteChangesListColumn />
    </main>
    <SiteFooter />
    <SiteFabs :sitekey="sitekey" />
    <NavigationTray>
      <SiteTray />
    </NavigationTray>
  </div>
</template>