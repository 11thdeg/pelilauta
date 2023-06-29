<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../composables/useSession'
import NotificationsList from '../components/inbox/NotificationsList.vue'
import WithPermission from '../components/ui/WithPermission.vue'
import { onMounted } from 'vue'
import { useTitle } from '../composables/useTitle'
import { useNotifications } from '../composables/useSession/useNotifications'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { watch } from 'vue'

const { t } = useI18n()
const router = useRouter()
const { anonymous } = useSession()
const { newCount, hasNew } = useNotifications()

onMounted(() => {
  watch(hasNew, () => {
    useTitle().title.value = pageTitle.value
  }, { immediate: true })
})

const pageTitle = computed(() => {
  return t('inbox.title') + (hasNew.value ? ` (${newCount.value})` : '')
})
</script>

<template>
  <div id="InboxView">
    <cn-app-bar
      id="TopBar"
      sticky
      :title="pageTitle"
      @back="router.back()"
    />
    <main class="singleColumnLayout">
      <WithPermission :forbidden="anonymous">
        <NotificationsList />
      </WithPermission>
    </main>
  </div>
</template>