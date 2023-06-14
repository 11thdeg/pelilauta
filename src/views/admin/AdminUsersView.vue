<script lang="ts" setup>
import { onMounted } from 'vue'
import AdminTray from '../../components/admin/AdminTray.vue'
import UserTool from '../../components/admin/UserTool/UserTool.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useSession } from '../../composables/useSession'
import { useTitle } from '../../composables/useTitle'

const { admin } = useSession()
const { title } = useTitle()

onMounted(() => {
  title.value = 'Admin / Users'
})
</script>

<template>
  <cyan-top-app-bar
    id="TopBar"
  >
    <cyan-icon noun="admin" />
    <h3>Admin / Users</h3>
  </cyan-top-app-bar>
  <main class="bookLayout">
    <WithPermission :forbidden="!admin">
      <UserTool />
    </WithPermission>
  </main>
  <AdminTray />
</template>
