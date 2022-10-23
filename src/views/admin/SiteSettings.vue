<script lang="ts" setup>
import { useSession } from '../../composables/useSession'
import AppBar from '../../components/navigation/AppBar.vue'
import TopBar from '../../components/ui/TopBar.vue'
import TopicTool from '../../components/admin/TopicTool.vue'
import SiteThemeTool from '../../components/admin/SiteThemeTool.vue'
import AdminTray from '../../components/admin/AdminTray.vue'

const { admin } = useSession()
</script>

<template>
  <div v-if="admin">
    <AppBar
      title="Admin"
      noun="admin"
    />
    <main class="SiteSettings dashboardLayout">
      <TopicTool />
      <SiteThemeTool />
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