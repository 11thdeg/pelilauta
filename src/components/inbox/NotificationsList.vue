<script lang="ts" setup>
import { useNotifications } from '../../composables/useNotifications'
import NotificationListItem from './NotificationListItem.vue'

const { notifications } = useNotifications()
</script>

<template>
  <div class="NotificationsList Column">
    <NotificationListItem
      v-for="notification in notifications"
      :key="notification.key"
      :notification="notification"
    />
  </div>
</template>

<style scoped lang="sass">
.NotificationsList
  display: flex
  flex-direction: column
  gap: 8px
</style>