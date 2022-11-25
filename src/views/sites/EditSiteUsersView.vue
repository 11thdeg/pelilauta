<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LoginRequiredColumn from '../../components/account/LoginRequiredColumn.vue'
import AppBar from '../../components/navigation/AppBar.vue'
import NavigationTray from '../../components/NavigationTray/NavigationTray.vue'
import OwnerEditor from '../../components/sites/tools/OwnerEditor.vue'
import PlayerEditor from '../../components/sites/tools/PlayerEditor.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'
import { useSession } from '../../composables/useSession'
import { useSite } from '../../composables/useSite'
import { fetchSite } from '../../composables/useSites'

const props = defineProps<{
  sitekey: string
}>()

const { t } = useI18n()
const { anonymous, uid } = useSession()

const site = ref(new Site())

onMounted(async () => {
  site.value = await fetchSite(props.sitekey) || new Site()
  useSite(site.value.key)
})
</script>

<template>
  <div id="EditSiteUsersView">
    <AppBar
      :title="site.name + ' ' + t('site.tools.users')"
      :noun="site.systemBadge"
    />
    <main class="dashboardLayout">
      <LoginRequiredColumn v-if="anonymous || !site.hasOwner(uid)" />
      <template v-else>
        <OwnerEditor />
        <PlayerEditor />
      </template>
    </main>
    <NavigationTray>
      <SiteTray />
    </NavigationTray>
  </div>
</template>