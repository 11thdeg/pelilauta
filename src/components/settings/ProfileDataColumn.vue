<script lang="ts" setup>
import { Profile } from '@11thdeg/skaldstore'
import { doc, getFirestore, updateDoc } from '@firebase/firestore'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAssets } from '../../composables/useAssets'
import { useSession } from '../../composables/useSession'
import { logDebug } from '../../utils/logHelpers'
import InsertAssetButton from '../InsertAssetButton/InsertAssetButton.vue'
    
const { t } = useI18n()
const { profile, active } = useSession()

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

const { fetchAsset } = useAssets()

async function onSelectAvatar (e: string) {
  const asset = await fetchAsset(e)
  if (asset?.url) avatarURL.value = asset.url
}

</script>
    
<template>
  <article class="ProfileDataColumn Column">
    <cyan-card>
      <cyan-loader v-if="!active" />
      <template v-else>
        <h2>{{ t('settings.profileData.title') }}</h2>
        <p class="lowEmphasis TypeBody2">
          {{ t('settings.profileData.description') }}
        </p>
        <div class="avatar">
          <img
            class="avatarImage"
            :src="avatarURL"
          >
          <InsertAssetButton
            :label="t('action.change')"
            noun="avatar"
            @insert="onSelectAvatar($event)"
          />
        </div>
        <cyan-textfield
          :label="t('fields.profile.nick')"
          :value="profile.nick"
          style="margin-bottom: 8px; margin-top: 8px;"
          @blur="nick = $event.target.value"
        />
        <cyan-textfield
          :label="t('fields.profile.bio')"
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
    </cyan-card>
  </article>
</template>

<style lang="sass" scoped>
.avatar
  display: flex
  justify-content: center
  flex-direction: column
  .avatarImage
    width: 128px
    height: 128px
    object-fit: cover
    border-radius: 50%
    margin: 0 auto
</style>