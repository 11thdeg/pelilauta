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
const props = defineProps<{
  sitekey: string
}>()

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
    <cyan-top-app-bar
      id="TopBar"
      modal
      back
      @back="$router.back()"
    >
      <h3>
        {{ t('site.settings.title') }} <span class="hideOnMobile">- {{ site.name }}</span>
      </h3>
      <cyan-spacer />
      <cyan-icon noun="kebab" />
    </cyan-top-app-bar>
    <main class="bookLayout">
      <LoginRequiredColumn v-if="anonymous || !site.hasOwner(uid)" />
      <template v-else>
        <ThemeEditor />
        <SiteMetaTool />
        <ChapterTool />
        <LinksTool />
      </template>
    </main>
    <NavigationTray>
      <SiteTray />
    </NavigationTray>
  </div>
</template>