<script lang="ts" setup>
import { Profile } from '@11thdeg/skaldstore'
import { Ref, ref, onMounted } from 'vue'
import { fetchProfile } from '../../composables/useProfiles'

const props = defineProps<{
  uid: string
}>()
const profile:Ref<Profile|undefined> = ref(undefined)
onMounted(async () => {
  profile.value = await fetchProfile(props.uid)
})
</script>

<template>
  <cyan-toolbar
    v-if="profile"
    style="padding: 0 4px; border-radius: 4px;"
  >
    <img
      class="avatar"
      :src="profile.avatarURL"
      onerror="this.src = '/proprietary/icons/dark/fox.svg'"
    >
    <p>{{ profile.nick }}</p>
    <cyan-spacer />
    <slot />
  </cyan-toolbar>
</template>

<style lang="sass" scoped>
.avatar
  width: 32px
  height: 32px
  border-radius: 50%
  margin-right: 8px
  object-fit: cover
</style>