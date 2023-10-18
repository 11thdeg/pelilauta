<script lang="ts" setup>
import { useSession } from '../../composables/useSession'
import TopicTool from '../../components/admin/TopicTool.vue'
import SiteThemeTool from '../../components/admin/SiteThemeTool/SiteThemeTool.vue'
import AdminTray from '../../components/admin/AdminTray.vue'
import SiteLicensesTool from '../../components/SiteLicensesTool/SiteLicensesTool.vue'
import { useTitle } from '../../composables/useTitle'
import { onMounted } from 'vue'
import ForbiddenView from '../../components/ui/ForbiddenView.vue'

const { admin } = useSession()
const { title } = useTitle()

onMounted(() => {
  title.value = 'Admin'
})

</script>

<template>
  <div v-if="admin">
    <cn-app-bar
      id="TopBar"
      noun="admin"
      sticky
      title="Admin"
    />
    <AdminTray />
    <main class="SiteSettings dashboardLayout">
      <TopicTool />
      <SiteThemeTool />
      <SiteLicensesTool />
    </main>
  </div>
  <div v-else>
    <ForbiddenView />
  </div>
</template>