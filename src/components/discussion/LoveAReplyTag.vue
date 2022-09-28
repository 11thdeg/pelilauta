<script lang="ts" setup>
import { computed } from 'vue';
import { loveReply, unloveReply } from '../../composables/useDiscussion';
import { useSession } from '../../composables/useSession'
import { logDebug } from '../../utils/logHelpers'

const props = defineProps<{
  reply: {
    key?: string,
    lovers?: string[]
    hasOwner: (uid: string) => boolean
  },
  threadKey: string
}>()
const { uid } = useSession()

const loves = computed(
  {
    get: () => props.reply.lovers?.includes(uid.value) || false ,// props.reply.lovers?.includes(uid.value)) || false },
    set: async (value: boolean) => {
      logDebug('loves', value)
      if (value) await loveReply(uid.value, props.threadKey, props.reply.key || '')
      else await unloveReply(uid.value, props.threadKey, props.reply.key || '')
    }
  }
)
const owns = computed(() => props.reply.hasOwner(uid.value))
const count = computed(() => props.reply.lovers?.length || 0)
</script>

<template>
  <cyan-love-button
    :on="loves"
    :disabled="owns"
    :count="count"
    @loves="loves = $event.detail.active"
  />
</template>