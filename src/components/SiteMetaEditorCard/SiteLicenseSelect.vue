<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSite } from '../../composables/useSite'
import LicenseSelect from '../LicenseSelect/LicenseSelect.vue'

const { t } = useI18n()
const { site, update } = useSite()

const license = computed({
  get: () => (site.value?.license || ''),
  set: (e: string) => update({
    license: e
  })
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