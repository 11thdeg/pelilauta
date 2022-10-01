<script lang="ts" setup>
import { useSession } from '../../composables/useSession'
import AppBar from '../../components/ui/AppBar.vue'
import TopBar from '../../components/ui/TopBar.vue'
import TopicTool from '../../components/admin/TopicTool.vue'

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
    </main>
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