<script setup lang="ts">
import { doc, getFirestore, updateDoc } from '@firebase/firestore'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSession, logout } from '../../composables/useSession'
import { logDebug } from '../../utils/logHelpers'
import WithLoader from '../ui/WithLoader.vue'

const router = useRouter()
const { t } = useI18n()
const { active, account } = useSession()

async function doLogout () {
  await logout()
  router.push('/')
}

function toggleLightMode (e: CustomEvent) {
  logDebug('toggleLightMode', e.detail)
  if (!account.value) return
  updateDoc(
    doc(getFirestore(), 'account', account.value.uid),
    { lightMode: e.detail ? 'dark' : 'light' }
  )
}

</script>

<template>
  <WithLoader :suspended="!active">
    <article class="appSettingsColumn Column">
      <h2>{{ t('settings.appSettings.title') }}</h2>
      <p>
        <cyan-toggle
          :label="t('fields.account.lightMode')"
          :value="account.lightMode"
          @change="toggleLightMode($event)"
        />
      </p>
      <p>
        <cyan-button
          noun="logout"
          text
          :label="t('action.logout')"
          @click="doLogout"
        />
      </p>
    </article>
  </WithLoader>
</template>
