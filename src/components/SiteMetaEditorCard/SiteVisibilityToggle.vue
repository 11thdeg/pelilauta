<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSite } from '../../composables/useSite'

const { t } = useI18n()
const { site, update } = useSite()

function setSiteVisibility(e: boolean) {
  update({
    hidden: e
  })
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