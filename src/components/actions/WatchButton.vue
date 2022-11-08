<script lang="ts" setup>
import { computed, onMounted } from 'vue'
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
const { anonymous } = useSession()
const { subscriber, watch } = useSubscriber()

onMounted(() => {
  if (subscriber.value?.watches(props.entry.key || '') || -1 > 0) {
    logDebug('watching, stamping', props.entry.key)
    watch(props.entry.key || '')
  }
})

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
</script>
<template>
  <cyan-watch-button
    v-if="!anonymous"
    :on="watches"
    :count="props.entry.followerCount"
    @loves="watches = $event.detail.active"
  />
</template>