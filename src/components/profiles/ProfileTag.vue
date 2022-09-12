<script lang="ts" setup>
import { Profile } from '@11thdeg/skaldstore'
import { onMounted, Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchProfile } from '../../composables/useProfiles'

const props = defineProps<{
  uid: string
}>()

const { t } = useI18n()
const loading = ref(true)
const profile:Ref<Profile|undefined> = ref(undefined)

onMounted(async () => {
  if (props.uid) profile.value = await fetchProfile(props.uid)
  loading.value = false
})
</script>

<template>
  <cyan-loader
    v-if="loading"
    xsmall
  />
  <template v-else>
    <router-link
      v-if="!profile"
      :to="`/about/anonymous`"
    >
      <cyan-tag :label="t('profiles.anonymous')" />
    </router-link>
    <router-link
      v-else
      :to="`/profiles/${profile.uid}`"
    >
      <cyan-tag :label="profile.nick" />
    </router-link>
  </template>
</template>