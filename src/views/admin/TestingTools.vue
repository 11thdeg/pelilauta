<script lang="ts" setup>
import { useSession } from '../../composables/useSession'
import AdminTray from '../../components/admin/AdminTray.vue'
import SnackbarTester from '../../components/admin/SnackbarTester.vue'
import BannerTester from '../../components/admin/BannerTester.vue'
import ModeTester from '../../components/admin/ModeTester.vue'
import { useTitle } from '../../composables/useTitle'
import { onMounted } from 'vue'

const { admin } = useSession()
const { title } = useTitle()

onMounted(() => {
  title.value = 'Admin / Testing tools'
})
</script>

<template>
  <div v-if="admin">
    <cyan-top-app-bar
      id="TopBar"
    >
      <cyan-icon noun="admin" />
      <h3>Admin / Testing tools</h3>
    </cyan-top-app-bar>
    <main class="SiteSettings dashboardLayout">
      <SnackbarTester />
      <BannerTester />
      <ModeTester />
    </main>
    <AdminTray />
  </div>
</template>