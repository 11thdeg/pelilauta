<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../composables/useSession'
import NotificationsList from '../components/inbox/NotificationsList.vue'
import WithPermission from '../components/ui/WithPermission.vue'
import { onMounted } from 'vue'
import { useTitle } from '../composables/useTitle'
import { useNotifications } from '../composables/useSession/useNotifications'

const { t } = useI18n()
const { anonymous } = useSession()
const { newCount, hasNew } = useNotifications()

onMounted(() => {
  useTitle().title.value = t('inbox.title')
})
</script>

<template>
  <div id="InboxView">
    <cyan-top-app-bar
      id="TopBar"
      modal
      back
      @back="$router.back()"
    >
      <h2>{{ $t('inbox.title') }} {{ hasNew ? `(${newCount})` : '' }}</h2>
    </cyan-top-app-bar>
    <main class="singleColumnLayout">
      <WithPermission :forbidden="anonymous">
        <NotificationsList />
      </WithPermission>
    </main>
  </div>
</template>