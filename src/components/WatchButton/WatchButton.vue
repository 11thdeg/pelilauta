<script lang="ts" setup>
import { computed } from 'vue'
import { useSession } from '../../composables/useSession'
import { useSubscriber } from '../../composables/useSubscriber'

const props = defineProps<{
  entry: {
    key?: string
    flowTime: number
    followerCount: number
    hasOwner: (uid: string) => boolean
  }
}>()
const { anonymous } = useSession()
const { subscribeTo, mute, watches } = useSubscriber()

function toggleSubscription(value: boolean) {
  if (!props.entry.key) return
  if (value) {
    subscribeTo(props.entry.key)
  } else {
    mute(props.entry.key)
  }
}

const active = computed(() => {
  if (!props.entry.key) return false
  return watches(props.entry.key)
})
</script>
<template>
  <cyan-watch-button
    v-if="!anonymous"
    :on="active"
    :count="props.entry.followerCount"
    @loves="toggleSubscription($event.detail.active)"
  />
</template>