<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { logDebug } from '../../utils/logHelpers'
import SelectAssetDialog from '../assets/SelectAssetDialog.vue'
    
const { t } = useI18n()
const { profile, active, updateProfile } = useSession()
const avatarDialog = ref(false)

function selectAvatar(url: string) {
  logDebug('selectAvatar', url)
  //profile.value.avatarURL = url
  updateProfile('avatarURL', url)
}
</script>
    
<template>
  <article class="ProfileDataColumn Column">
    <cyan-loader v-if="!active" />
    <template v-else>
      <h2>{{ t('settings.profileData.title') }}</h2>
      <p class="lowEmphasis">
        {{ t('settings.profileData.description') }}
      </p>
      <div class="avatar">
        <img
          style="max-width: 200px; display: block; margin: 0 auto;border-radius: 50%;"
          :src="profile.avatarURL"
        >
        <cyan-button
          noun="edit"
          class="avatarButton"
          :label="t('action.change')"
          @click="avatarDialog = true"
        />
      </div>
      <SelectAssetDialog
        v-model="avatarDialog"
        @select="selectAvatar($event)"
      />
      <cyan-textfield :value="profile.nick" />
      <cyan-textfield :value="profile.bio" />
    </template>
  </article>
</template>

<style lang="sass" scoped>
.avatar
  position: relative
  .avatarButton
    position: absolute
    bottom: 12px
    right: 12px
</style>