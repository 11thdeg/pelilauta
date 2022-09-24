<script lang="ts" setup>
import { computed } from 'vue'
import { useSession } from '../../composables/useSession'
import { logDebug } from '../../utils/loghelpers'
import { loveThread, unLoveThread } from '../../composables/useThreads'

const props = defineProps<{
  thread: {
    key?: string
    lovedCount: number
    hasOwner: (uid: string) => boolean
  }
}>()
const { profile, account } = useSession()

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
</script>

<template>
  <cyan-love-button
    :on="loves"
    :disabled="owns"
    :count="props.thread.lovedCount"
    @loves="loves = $event.detail.active"
  />
</template>