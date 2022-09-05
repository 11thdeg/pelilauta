<script lang="ts" setup>
import { Profile } from '@11thdeg/skaldstore'
import { doc, getFirestore, updateDoc } from '@firebase/firestore'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { logDebug } from '../../utils/logHelpers'
import SelectAssetDialog from '../assets/SelectAssetDialog.vue'
    
const { t } = useI18n()
const { profile, active } = useSession()
const avatarDialog = ref(false)

const _avatarURL = ref('')
const avatarURL = computed({
  get() {
    return _avatarURL.value || profile.value.avatarURL || ''
  },
  set(value: string) {
    _avatarURL.value = value
  }
})
const _nick = ref('')
const nick = computed({
  get() {
    return _nick.value || profile.value.nick || ''
  },
  set(value: string) {
    _nick.value = value
  }
})
const _bio = ref('')
const bio = computed({
  get() {
    return _bio.value || profile.value.bio || ''
  },
  set(value: string) {
    _bio.value = value
  }
})
const changes = computed(() => {
  return _avatarURL.value.length > 0 || _nick.value.length > 0 || _bio.value.length > 0
})

async function save () {
  logDebug('save', { avatarURL, nick, bio })
  profile.value.avatarURL = avatarURL.value
  profile.value.nick = nick.value
  profile.value.bio = bio.value
  updateDoc(
    doc(
      getFirestore(), 
      Profile.collectionName, 
      profile.value.uid
    ), 
    profile.value.docData
  )
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
          :src="avatarURL"
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
        @select="avatarURL = $event"
      />
      <cyan-textfield
        :value="profile.nick"
        @blur="nick = $event.target.value"
      />
      <cyan-textfield
        :value="profile.bio"
        @blur="bio = $event.target.value"
      />
      <cyan-toolbar>
        <cyan-spacer />
        <cyan-button
          noun="save"
          :label="t('action.save')"
          :disabled="!changes"
          @click="save"
        />
      </cyan-toolbar>
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