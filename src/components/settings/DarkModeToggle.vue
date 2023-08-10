<script lang="ts" setup>
import { CyanToggleButton } from '@11thdeg/cyan'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { store } from '../../utils/firestoreHelpers'

const { t } = useI18n()
const { account } = useSession()

async function toggle(e: Event) {
  const target = e.target as CyanToggleButton
  const checked = !target.pressed
  if (account.value) {
    account.value.lightMode = checked ? 'dark' : 'light'
    await store(account.value)
  }
}
</script>

<template>
  <fieldset>
    <legend>{{ t('account.theme.title') }}</legend>
    <cn-toggle-button
      :label="t('account.theme.experimentalLightMode')"
      :pressed="account?.lightMode === 'dark'"
      @change="toggle"
    />
  </fieldset>
</template>