<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import { useSession } from '../../composables/useSession'
import { fetchSite } from '../../composables/useSites'
import LoginRequiredColumn from '../../components/account/LoginRequiredColumn.vue'
import ChapterTool from '../../components/sites/tools/ChapterTool.vue'
import { useSite } from '../../composables/useSite'
import ThemeEditor from '../../components/sites/tools/ThemeEditor.vue'
import NavigationTray from '../../components/NavigationTray/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'
import LinksTool from '../../components/sites/tools/LinksTool.vue'
import SiteMetaTool from '../../components/SiteMetaEditorCard/SiteMetaTool.vue'
import { useI18n } from 'vue-i18n'
import { useTitle } from '@vueuse/core'
import SiteFooter from '../../components/SiteFooter/SiteFooter.vue'
import { useRouter } from 'vue-router'
const props = defineProps<{
  sitekey: string
}>()

const router = useRouter()
const { anonymous, uid } = useSession()
const site = ref(new Site())
const { t } = useI18n()

onMounted(async () => {
  site.value = await fetchSite(props.sitekey) || new Site()
  useSite(site.value.key)
  useTitle(t('site.settings.title') + ' - ' + site.value.name)
})
</script>

<template>
  <div id="EditSiteView">
    <cn-app-bar 
      noun="adventurer"
      :title="t('site.settings.title')"
      modal
      @back="router.push('/sites/' + sitekey)"
    />
    <main class="dashboardLayout">
      <LoginRequiredColumn v-if="anonymous || !site.hasOwner(uid)" />
      <template v-else>
        <ThemeEditor />
        <SiteMetaTool />
        <ChapterTool />
        <LinksTool />
      </template>
    </main>
    <SiteFooter />
    <NavigationTray>
      <SiteTray />
    </NavigationTray>
  </div>
</template>