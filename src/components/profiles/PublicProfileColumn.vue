<script setup lang="ts">
import { Profile } from '@11thdeg/skaldstore'
import { onMounted, Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchProfile } from '../../composables/useProfiles'
import { useSession } from '../../composables/useSession'
import { useRouter } from 'vue-router'

const props = defineProps<{
  uid: string
}>()

const profile:Ref<Profile|undefined> = ref(undefined)

const { account } = useSession()

const { t } = useI18n()
const router = useRouter()

onMounted(async () => {
  profile.value = await fetchProfile(props.uid)
})
</script>

<template>
  <article
    v-if="profile"
    class="small column" 
  >
    <cyan-card class="identity">
      <img
        class="avatar"
        :src="profile.avatarURL"
      >
      <h3>{{ profile.nick }}</h3>
      <p class="TypeBody2">
        {{ profile.bio }}
      </p>
      <cyan-toolbar v-if="account.uid === uid">
        <cyan-spacer />
        <cyan-button
          :label="t('action.edit')"
          text
          noun="edit"
          @click="router.push('/settings')"
        />
        <cyan-spacer />
      </cyan-toolbar>
    </cyan-card>
  </article>
</template>

<style lang="sass" scoped>
.identity
  img
    width: 128px
    height: 128px
    border-radius: 50%
    display: block
    margin: 0 auto
  h3
    text-align: center
  p
    text-align: center
</style>