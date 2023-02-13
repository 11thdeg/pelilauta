<script lang="ts" setup>
import { CyanReactionButton } from '@11thdeg/cyan'
import { computed } from 'vue'
import { useSession } from '../../composables/useSession'
import { logDebug } from '../../utils/logHelpers'

const props = defineProps<{
  site: {
    key?: string
    // lovedCount?: number
    hasOwner: (uid: string) => boolean
  }
}>()
const { profile, uid } = useSession()

const loves = computed(
  {
    get: () => profile.value?.loves(props.site.key || '') || false,
    set: async (value: boolean) => {
      logDebug('loves not implemented', value)
      // if (value) await loveSite(account.value?.uid || '', props.site.key || '')
      //else await unLoveSite(account.value?.uid || '', props.site.key || '')
    }
  }
)

const owns = computed(() => props.site.hasOwner(uid.value || ''))

function handleChange (e: Event) {
  const button = (e.target as CyanReactionButton)
  logDebug('handleChange', button.on, button.ariaPressed)
  loves.value = button.on
}
</script>

<template>
  <cn-reaction-button
    :on="loves"
    :aria-pressed="loves + ''"
    :disabled="owns"
    :count="0"
    @change="handleChange"
  />  
</template>