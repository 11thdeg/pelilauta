<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../components/navigation/TopBar.vue'
import { useSession } from '../composables/useSession'
import NotificationsList from '../components/inbox/NotificationsList.vue'
import WithPermission from '../components/ui/WithPermission.vue'
import { onMounted } from 'vue'
import { useTitle } from '@vueuse/core'

const { t } = useI18n()
const { anonymous } = useSession()
onMounted(() => {
  useTitle().value = t('app.title') + ' / ' + t('inbox.title')
})
</script>

<template>
  <div class="InboxView">
    <TopBar :title="t('inbox.title')" />
    <main class="singleColumnLayout">
      <WithPermission :forbidden="anonymous">
        <NotificationsList />
      </WithPermission>
    </main>
  </div>
</template>