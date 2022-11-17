<script lang="ts" setup>
import { useSession } from '../../composables/useSession'
import { useSubscriber } from '../../composables/useSession/useSubscriber'

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
</script>
<template>
  <cyan-watch-button
    v-if="!anonymous"
    :on="watches(entry.key)"
    :count="props.entry.followerCount"
    @loves="toggleSubscription($event.detail.active)"
  />
</template>