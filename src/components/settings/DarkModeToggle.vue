<script lang="ts" setup>
import { CyanToggleButton } from '@11thdeg/cyan'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { store } from '../../utils/firestoreHelpers'
import { computed } from 'vue'

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

const pressed = computed(() => account.value?.lightMode !== 'dark' ? true : undefined)
</script>

<template>
  <fieldset>
    <legend>{{ t('account.theme.title') }}</legend>
    <cn-toggle-button
      :label="t('account.theme.experimentalLightMode')"
      :pressed="pressed"
      @change="toggle"
    />
  </fieldset>
</template>