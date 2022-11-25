<script lang="ts" setup>
import AdminTray from '../../components/admin/AdminTray.vue'
import UserTool from '../../components/admin/UserTool/UserTool.vue'
import AppBar from '../../components/navigation/AppBar.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useSession } from '../../composables/useSession'

const { admin } = useSession()
</script>

<template>
  <AppBar
    title="Admin"
    noun="admin"
  />
  <main class="bookLayout">
    <WithPermission :forbidden="!admin">
      <UserTool />
    </WithPermission>
  </main>
  <AdminTray />
</template>
