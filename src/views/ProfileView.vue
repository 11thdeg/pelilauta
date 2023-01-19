<script setup lang="ts">
import { Profile } from '@11thdeg/skaldstore'
import { onMounted, Ref, ref } from 'vue'
import AppBar from '../components/navigation/AppBar.vue'
import { fetchProfile } from '../composables/useProfiles'
import PublicProfileColumn from '../components/profiles/PublicProfileColumn.vue'
import ProfilePostsColumn from '../components/profiles/ProfilePostsColumn.vue'
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  uid: string
}>()

const { t } = useI18n()

const profile:Ref<Profile|undefined> = ref(undefined)

onMounted(async () => {
  profile.value = await fetchProfile(props.uid, { reload: true })
  useTitle().value =  t('app.title') + ' / ' + profile.value?.nick || 'i'
})

</script>

<template>
  <div id="ProfileView">
    <AppBar />
    <main class="bookLayout">
      <cyan-loader
        v-if="!profile"
        column
      />
      <template v-else>
        <PublicProfileColumn :uid="uid" />
        <ProfilePostsColumn :uid="uid" />
      </template>
    </main>
  </div>
</template>