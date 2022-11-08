<script lang="ts" setup>
import { computed } from 'vue'
import { useSession } from '../../composables/useSession'
import { logDebug } from '../../utils/loghelpers'
import { unwatch, watch, useSubscriber } from '../../composables/useSession/useSubscriber'

const props = defineProps<{
  entry: {
    key?: string
    followerCount: number
    hasOwner: (uid: string) => boolean
  }
}>()
const { uid } = useSession()
const { subscriber } = useSubscriber()

const watches = computed(
  {
    get: () => 
    {
      if (props.entry.key && subscriber.value) {
        return subscriber.value.watches(props.entry.key) > 0
      }
      return false
    },
    set: async (value: boolean) => {
      logDebug('watch', props.entry.key, value)
      if (value) watch(props.entry.key || '')
      else unwatch(props.entry.key || '')
    }
  }
)
const owns = computed(() => props.entry.hasOwner(uid.value))
</script>
<template>
  <cyan-watch-button
    :on="watches"
    :disabled="owns"
    :count="props.entry.followerCount"
    @loves="watches = $event.detail.active"
  />
</template>