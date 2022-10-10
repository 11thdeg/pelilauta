<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../components/ui/TopBar.vue'
import { useSession } from '../composables/useSession'
import ForbiddenView from '../components/ui/ForbiddenView.vue'
import NotificationsList from '../components/inbox/NotificationsList.vue'

const { t } = useI18n()
const { anonymous } = useSession()
</script>

<template>
  <div class="InboxView">
    <TopBar :label="t('inbox.title')" />
    <main class="singleColumnLayout">
      <ForbiddenView v-if="anonymous" />
      <NotificationsList v-else />
    </main>
  </div>
</template>