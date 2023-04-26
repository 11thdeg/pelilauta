<script lang="ts" setup>
import { CyanToggle } from '@11thdeg/cyan'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { store } from '../../utils/firestoreHelpers'

const { t } = useI18n()
const { account, admin } = useSession()

async function toggle(e: Event) {
  const target = e.target as CyanToggle
  const checked = target.checked
  if (account.value) {
    account.value.lightMode = checked ? 'dark' : 'light'
    await store(account.value)
  }
}
</script>

<template>
  <cyan-toolbar>
    <cyan-spacer />
    <cyan-toggle
      v-if="admin"
      :label="t('settings.appSettings.darkMode')"
      @change="toggle"
    />
  </cyan-toolbar>
</template>