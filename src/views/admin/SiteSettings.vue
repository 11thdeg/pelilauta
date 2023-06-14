<script lang="ts" setup>
import { useSession } from '../../composables/useSession'
import TopBar from '../../components/navigation/TopBar.vue'
import TopicTool from '../../components/admin/TopicTool.vue'
import SiteThemeTool from '../../components/admin/SiteThemeTool/SiteThemeTool.vue'
import AdminTray from '../../components/admin/AdminTray.vue'
import SiteLicensesTool from '../../components/SiteLicensesTool/SiteLicensesTool.vue'
import { useTitle } from '../../composables/useTitle'
import { onMounted } from 'vue'

const { admin } = useSession()
const { title } = useTitle()

onMounted(() => {
  title.value = 'Admin'
})

</script>

<template>
  <div v-if="admin">
    <cyan-top-app-bar
      id="TopBar"
    >
      <cyan-icon noun="admin" />
      <h3>Admin</h3>
    </cyan-top-app-bar>
    <main class="SiteSettings dashboardLayout">
      <TopicTool />
      <SiteThemeTool />
      <SiteLicensesTool />
    </main>
    <AdminTray />
  </div>
  <div v-else>
    <TopBar title="500" />
    <main class="SiteSettings singleColumnLayoyt">
      <cyan-icon
        noun="fox"
        xlarge
        style="display: block; margin: 0 auto;"
      />
    </main>
  </div>
</template>