<script lang="ts" setup>
import { Notification } from "@11thdeg/skaldstore"
import { computed, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { fetchThread } from "../../composables/useThreads"
import { logError } from "../../utils/logHelpers"
import ProfileTag from "../profiles/ProfileTag.vue"

const props = defineProps<{
  notification: Notification
}>()

const { t } = useI18n()

const noun = computed(() => {
  return props.notification.read ? "fox" : "idea"
})

const targetTitle = ref('')
const targerRoute = ref('')

onMounted(async () => {
  if (props.notification.targetType === 'thread') {
    const thread = await fetchThread(props.notification.targetKey)
    targetTitle.value = thread? thread.title : t('thread.deleted')
    targerRoute.value = `/threads/${props.notification.targetKey}`
  }
})

function markRed() {
  logError('markRed() not implemented')
}
</script>

<template>
  <div
    class="NotificationListItem"
    :class="{
      unread: !notification.read,
      hoverable: !notification.read,
      clickable: !notification.read
    }"
    @click="markRed"
  >
    <cyan-icon
      small
      :noun="noun"
    />
    <div>
      <h2 class="TypeCaption">
        <router-link :to="targerRoute">
          {{ targetTitle }}
        </router-link>
      </h2>
      <p class="TypeBody2 oneLiner">
        <ProfileTag
          :uid="notification.from"
        /> {{ notification.message }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="sass">
.NotificationListItem
  display: flex
  align-items: center
  gap: 8px
  padding-left: 8px
  &.unread
    border-left: 4px solid var(--cyan-divider-color)
    padding-left: 4px
</style>