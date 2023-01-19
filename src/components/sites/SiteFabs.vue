<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { useSites } from '../../composables/useSites'
import EditPageFab from '../EditPageFab/EditPageFab.vue'
import FabTray from '../FabTray/FabTray.vue'

const { t } = useI18n()

const props = defineProps<{
  pagekey?: string
  sitekey: string
}>()
const { uid } = useSession()
const { allSites } = useSites()
const site = computed(() => {
  return allSites.value.find((s) => s.key === props.sitekey) || new Site()
})
const owns = computed(() => {
  return site.value.hasOwner(uid.value)
})
</script>

<template>
  <FabTray>
    <!--cyan-fab
      v-if="owns"
      :label="t('action.add.thread')"
      noun="discussion"
      @click="$router.push('/sites/' + sitekey + '/add/thread')"
    /-->
    <EditPageFab />
    <cyan-fab
      v-if="owns"
      small
      secondary
      :label="t('action.add.page')"
      noun="add"
      @click="$router.push('/sites/' + sitekey + '/add/page')"
    />
  </FabTray>
</template>