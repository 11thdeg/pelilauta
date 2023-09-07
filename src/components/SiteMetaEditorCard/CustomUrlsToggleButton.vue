<script setup lang="ts">
import { computed } from 'vue'
import { useSite } from '../../composables/useSite'
import { updateStorable } from '../../utils/firestoreHelpers'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { site } = useSite()

async function save() {
  if (!site.value) throw new Error('No site loaded')
  updateStorable(site.value, { silent: true })
}

const customPageKeys = computed({
  get: () => site.value?.customPageKeys || undefined,
  set: (value) => {
    site.value!.customPageKeys = !!value
    save()
  },
})
</script>

<template>
  <!-- Toggles messaging on and off -->
  <cn-toggle-button
    :label="t('site.tools.config.customPageKeys')"
    :pressed="customPageKeys"
    :aria-pressed="customPageKeys"
    @change="customPageKeys = $event.target.pressed"
  />
</template>