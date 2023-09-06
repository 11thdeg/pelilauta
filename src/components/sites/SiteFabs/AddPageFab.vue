<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSite } from '../../../composables/useSite'
import { computed } from 'vue'

const { t } = useI18n()
const { canEdit, site } = useSite()

const addRoute = computed(() => {
  if (site.value?.customPageKeys) {
    return '/sites/' + site.value.key + '/craft/page'
  }
  return '/sites/' + site.value?.key + '/add/page'
})
</script>

<template>
  <cyan-fab
    v-if="canEdit"
    small
    secondary
    :label="t('action.add.page')"
    noun="add"
    @click="$router.push(addRoute)"
  />
</template>