<script lang="ts" setup>
import { Profile } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchProfile } from '../../composables/useProfiles'


const props = defineProps<{
  uid: string;
}>()

const { t } = useI18n()

const profile = ref<Profile | undefined>(undefined)
const loading = ref(true)

onMounted(async () => {
  profile.value = await fetchProfile(props.uid)
  loading.value = false
})

</script>

<template>
  <section class="ProfilePane">
    <cyan-loader
      v-if="loading"
      inline
    />
    <router-link
      v-else-if="profile"
      class="profile"
      :to="`/profiles/${profile.uid}`"
    >
      <img
        class="avatar"
        :src="profile.avatarURL"
      >
      <div class="info">
        <h4>{{ profile.nick }}</h4>
        <p class="TypeBody2 lowEmphasis">
          {{ profile.bio }}
        </p>
      </div>
    </router-link>
    <template v-else>
      <router-link to="/profiles/anonymous">
        {{ t('profile.anonymous.info') }}
      </router-link>
    </template>
  </section>
</template>

<style lang="sass" scoped>
.profile
  display: flex
  gap: 12px
  border-top: solid 1px var(--cyan-divider-color)
.avatar
  width: 72px
  height: 72px
  border-radius: 50%
  object-fit: cover
</style>
