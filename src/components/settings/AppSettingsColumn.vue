<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { logout } from '../../composables/useSession'
import MarkAllSeenButton from '../MarkAllSeenButton/MarkAllSeenButton.vue'
import DarkModeToggle from './DarkModeToggle.vue'
import MessagingSettingsPane from '../account/messaging/MessagingSettingsPane.vue'

const router = useRouter()
const { t } = useI18n()

async function doLogout () {
  await logout()
  router.push('/')
}
</script>

<template>
  <article class="appSettingsColumn Column">
    <h2>{{ t('settings.appSettings.title') }}</h2>
    <section class="fieldset">
      <DarkModeToggle />
      <cyan-toolbar>
        <cyan-spacer />
        <MarkAllSeenButton />
      </cyan-toolbar>
      <cyan-toolbar>
        <cyan-spacer />
        <cyan-button
          noun="logout"
          text
          :label="t('action.logout')"
          @click="doLogout"
        />
      </cyan-toolbar>
    </section>

    <MessagingSettingsPane />
  </article>
</template>
