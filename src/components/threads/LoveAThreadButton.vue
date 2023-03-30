<script lang="ts" setup>
import { computed } from 'vue'
import { useSession } from '../../composables/useSession'
import { logDebug } from '../../utils/loghelpers'
import { loveThread, unLoveThread } from '../../composables/useThreads'
import { CyanReactionButton } from '@11thdeg/cyan'

const props = defineProps<{
  thread: {
    key?: string
    lovedCount: number
    hasOwner: (uid: string) => boolean
  }
}>()
const { profile, account, anonymous } = useSession()

const loves = computed(
  {
    get: () => profile.value?.loves(props.thread.key || '') || false,
    set: async (value: boolean) => {
      logDebug('loves', value)
      if (value) await loveThread(account.value?.uid || '', props.thread.key || '')
      else await unLoveThread(account.value?.uid || '', props.thread.key || '')
    }
  }
)
const owns = computed(() => props.thread.hasOwner(account.value?.uid|| ''))

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
    :disabled="owns || anonymous"
    :count="props.thread.lovedCount"
    @change="handleChange"
  />
</template>