<script lang="ts" setup>
import { useSession } from '../../composables/useSession'
import AppBar from '../../components/navigation/AppBar.vue'
import AdminTray from '../../components/admin/AdminTray.vue'
import SnackbarTester from '../../components/admin/SnackbarTester.vue'

const { admin } = useSession()
</script>

<template>
  <div v-if="admin">
    <AppBar
      title="Testing Tools"
      noun="admin"
    />
    <main class="SiteSettings dashboardLayout">
      <SnackbarTester />
    </main>
    <AdminTray />
  </div>
</template>