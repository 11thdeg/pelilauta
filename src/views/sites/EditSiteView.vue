<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import AppBar from '../../components/navigation/AppBar.vue'
import { useSession } from '../../composables/useSession'
import { fetchSite } from '../../composables/useSites'
import LoginRequiredColumn from '../../components/account/LoginRequiredColumn.vue'
import ChapterTool from '../../components/sites/tools/ChapterTool.vue'
import { useSite } from '../../composables/useSite'
import ThemeEditor from '../../components/sites/tools/ThemeEditor.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'
import LinksTool from '../../components/sites/tools/LinksTool.vue'
const props = defineProps<{
  sitekey: string
}>()

const { anonymous, uid } = useSession()
const site = ref(new Site())

onMounted(async () => {
  site.value = await fetchSite(props.sitekey) || new Site()
  useSite(site.value.key)
})
</script>

<template>
  <div id="EditSiteView">
    <AppBar
      :title="site.name"
      :noun="site.systemBadge"
    />
    <main class="dashboardLayout">
      <LoginRequiredColumn v-if="anonymous || !site.hasOwner(uid)" />
      <template v-else>
        <ThemeEditor />
        <ChapterTool />
        <LinksTool />
      </template>
    </main>
    <NavigationTray>
      <SiteTray />
    </NavigationTray>
  </div>
</template>