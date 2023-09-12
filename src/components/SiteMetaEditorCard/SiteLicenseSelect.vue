<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSite } from '../../composables/useSite'
import LicenseSelect from '../LicenseSelect/LicenseSelect.vue'
import { updateStorable } from '../../utils/firestoreHelpers'

const { t } = useI18n()
const { site } = useSite()

const license = computed({
  get: () => (site.value.license || ''),
  set: (e: string) => updateStorable(site.value, {
    license: e
  }, { silent: true })
})

</script>

<template>
  <section class="SiteLicenseSelect">
    <h4>
      {{ t('fields.site.license') }}
    </h4>
    <LicenseSelect v-model="license" />
    <p class="TypeCaption lowEmphasis">
      {{ t('site.settings.license.info') }}
    </p>  
  </section>
</template>