<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { logout } from '../../composables/useSession'

const router = useRouter()
const { t } = useI18n()

async function doLogout () {
  await logout()
  router.push('/')
}
</script>

<template>
  <article class="appSettingsColumn Column">
    <cyan-card>
      <h2>{{ t('settings.appSettings.title') }}</h2>
      <cyan-toolbar>
        <h4 class="downscaled">
          {{ t('settings.appSettings.darkMode') }}
        </h4>
        <!--cyan-lightmode-toggle /-->
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
    </cyan-card>
  </article>
</template>
