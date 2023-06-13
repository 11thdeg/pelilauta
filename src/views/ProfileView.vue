<script setup lang="ts">
import { Profile } from '@11thdeg/skaldstore'
import { onMounted, Ref, ref } from 'vue'
import { fetchProfile } from '../composables/useProfiles'
import PublicProfileColumn from '../components/profiles/PublicProfileColumn.vue'
import ProfilePostsColumn from '../components/profiles/ProfilePostsColumn.vue'
import { useTitle } from '../composables/useTitle'
import { useRouter } from 'vue-router'
import ShareButton from '../components/ShareButton/ShareButton.vue'

const props = defineProps<{
  uid: string
}>()

const router = useRouter()

const profile:Ref<Profile|undefined> = ref(undefined)

onMounted(async () => {
  profile.value = await fetchProfile(props.uid, { reload: true })
  useTitle().title.value = profile.value?.nick || props.uid
})

</script>

<template>
  <div id="ProfileView">
    <cyan-top-app-bar
      sticky
      modal
      @back="router.back()"
    >
      <h3>
        {{ profile?.nick || '...' }}
      </h3>
      <cyan-spacer />
      <ShareButton />
    </cyan-top-app-bar>
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