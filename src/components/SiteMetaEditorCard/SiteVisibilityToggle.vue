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
  <cyan-toggle
    v-if="site"
    :label="t('fields.site.hidden')"
    :checked="site.hidden"
    @change="setSiteVisibility($event.detail)"
  />
</template>