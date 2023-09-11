<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSite } from '../../composables/useSite'
import { updateStorable } from '../../utils/firestoreHelpers'
import { patchSite } from '../../composables/useSites'
import { Site } from '@11thdeg/skaldstore'
import { logDebug } from '../../utils/logHelpers'

const { t } = useI18n()
const { site } = useSite()

async function setSiteVisibility(e: boolean) {
  logDebug('SiteVisibilityToggle', 'setSiteVisibility', e, site.value.key)
  // Update site hidden status, but do not trigger a change timestamp update
  await updateStorable(site.value, {
    hidden: e
  }, { 
    silent: true
  })
  patchSite(new Site(site.value.docData, site.value.key))
}
</script>

<template>
  <!-- Toggles site visibility in public listings -->
  <cn-toggle-button
    v-if="site"
    :label="t('fields.site.hidden')"
    :pressed="site.hidden"
    :aria-pressed="site.hidden"
    @change="setSiteVisibility($event.target.pressed)"
  />
</template>