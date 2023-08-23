<script lang="ts" setup>
import { Profile } from '@11thdeg/skaldstore'
import { computed, onMounted, Ref, ref } from 'vue'
import { fetchProfile } from '../../composables/useProfiles'

const props = defineProps<{
  uid: string
}>()

const loading = ref(true)
const profile:Ref<Profile|undefined> = ref(undefined)

onMounted(async () => {
  if (props.uid) profile.value = await fetchProfile(props.uid)
  loading.value = false
})

const hasAvatar = computed(() => {
  return profile.value?.avatarURL !== undefined
})

const PlaceholderAvatarBackgroundColor = computed(() => {
  if (!profile.value) return 'transparent'
  const hash = profile.value.uid.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0)
  }, 0)
  const hue = hash % 360
  return `hsl(${hue}, 50%, 50%)`
})
</script>

<template>
  <div class="ProfileAvatar">
    <img 
      v-if="hasAvatar"
      :src="profile?.avatarURL"
      :alt="profile?.nick"
    >
    <div
      v-else
      class="PlaceholderAvatar"
      :style="`background-color: ${PlaceholderAvatarBackgroundColor}`"
    >
      {{ profile?.nick.substring(0, 2) }}
    </div>
  </div>
</template>

<style lang="sass" scoped>
.ProfileAvatar
  height: 48px
  width: 48px
  border-radius: 50%
  flex-shrink: 0
  img
    height: 100%
    width: 100%
    border-radius: 50%
</style>

