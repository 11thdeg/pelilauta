<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useScreenSize } from '../../composables/useScreenSize'
import { useSite } from '../../composables/useSite'

const route = useRoute()
const router = useRouter()
const { canEdit, site } = useSite()
const { t } = useI18n()
const { isSmall } = useScreenSize()

const label = computed(() => {
  if (isSmall.value) {
    return undefined
  } else {
    return t('action.edit')
  }
})

function editPage() {
  const routePage = route.params.pagekey 
  const routeSite = site.value?.key || route.params.sitekey || ''
  if (routePage) {
    router.push(`/sites/${routeSite}/pages/${routePage}/edit`)
  }
  else {
    const homepage = site.value?.homepage || routeSite
    if (!homepage) throw new Error('No homepage found, aborting')
    router.push(`/sites/${routeSite}/pages/${homepage}/edit`)
  }
}

</script>
<template>
  <cyan-fab
    v-if="canEdit"
    noun="edit"
    :label="label"
    @click.prevent="editPage"
  />
</template>