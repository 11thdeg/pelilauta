<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useNotifications } from '../../composables/useSession/useNotifications'
import EmptyCollection from '../ui/EmptyCollection.vue'
import NotificationListItem from './NotificationListItem.vue'

const { notifications } = useNotifications()
const { t } = useI18n()
</script>

<template>
  <article class="NotificationsList Column">
    <EmptyCollection
      v-if="notifications.length === 0"
      noun="discussion"
      :title="t('inbox.empty.title')"
      :message="t('inbox.empty.message')"
    />
    <section class="flex flex-column">
      <NotificationListItem
        v-for="notification in notifications"
        :key="notification.key"
        :notification="notification"
      />
    </section>
  </article>
</template>