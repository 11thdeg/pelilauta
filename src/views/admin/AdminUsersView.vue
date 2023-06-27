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
  <cn-app-bar
    id="TopBar"
    noun="admin"
    sticky
    title="Admin / Users"
  />
  <main class="bookLayout">
    <WithPermission :forbidden="!admin">
      <UserTool />
    </WithPermission>
  </main>
  <AdminTray />
</template>
