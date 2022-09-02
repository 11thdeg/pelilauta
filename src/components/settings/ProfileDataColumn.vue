<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import SelectAssetDialog from '../assets/SelectAssetDialog.vue'
    
const { t } = useI18n()
const { profile, active } = useSession()
const avatarDialog = ref(true)
</script>
    
<template>
  <article class="ProfileDataColumn Column">
    <cyan-loader v-if="!active" />
    <template v-else>
      <h2>{{ t('account.profileData.title') }}</h2>
      <p class="lowEmphasis">
        {{ t('account.profileData.description') }}
      </p>
      <img
        style="max-width: 200px; display: block; margin: 0 auto;border-radius: 50%;"
        :src="profile.avatarURL"
      >
      <cyan-button
        :label="t('account.profileData.changeAvatar')"
        text
        @click="avatarDialog = true"
      />
      <SelectAssetDialog v-model="avatarDialog" />
      <cyan-textfield :value="profile.nick" />
      <cyan-textfield :value="profile.bio" />
      <div class="debug code">
        {{ profile }}
      </div>
    </template>
  </article>
</template>