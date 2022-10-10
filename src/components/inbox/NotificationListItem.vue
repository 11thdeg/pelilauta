<script lang="ts" setup>
import { Notification } from "@11thdeg/skaldstore"
import { computed } from "vue"
import ProfileTag from "../profiles/ProfileTag.vue"

const props = defineProps<{
  notification: Notification
}>()

const noun = computed(() => {
  return props.notification.read ? "idea" : "send"
})
</script>

<template>
  <div class="NotificationListItem">
    <cyan-icon
      small
      :noun="noun"
    />
    <p>{{ notification.message }}</p>
    <div class="tag">
      <ProfileTag
        :uid="notification.from"
      />
    </div>
  </div>
</template>

<style scoped lang="sass">
.NotificationListItem
  display: flex
  align-items: center
  gap: 8px
</style>