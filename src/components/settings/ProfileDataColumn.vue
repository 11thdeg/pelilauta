<script lang="ts" setup>
import { Profile } from '@11thdeg/skaldstore'
import { doc, getFirestore, updateDoc } from '@firebase/firestore'
import { useI18n } from 'vue-i18n'
import { useAssets } from '../../composables/useAssets'
import { useProfile } from '../../composables/useSession/useProfile'
import { useSession } from '../../composables/useSession'
import InsertAssetButton from '../InsertAssetButton/InsertAssetButton.vue'
import { logDebug } from '../../utils/logHelpers'
    
const { t } = useI18n()
const { uid } = useSession()
const { profile } = useProfile()

async function save (key: string, value: string) {
  await updateDoc(
    doc(
      getFirestore(), 
      Profile.collectionName, 
      uid.value
    ), 
    { [key]: value}
  )
}

const { fetchAsset } = useAssets()

async function onSelectAvatar (e: string) {
  logDebug('onSelectAvatar', e)
  const asset = await fetchAsset(e)
  logDebug('onSelectAvatar', asset)
  if (asset && asset.url) {
    await save('avatarURL', asset.url)
  }
}

async function onNickChange (e: string) {
  save('nick', e)
}

async function onBioChange (e: string) {
  save('bio', e)
}


</script>
    
<template>
  <article class="ProfileDataColumn Column">
    <cyan-card
      v-if="profile"
      :cover="profile.avatarURL"
      elevation="1"
    >
      <img
        slot="avatar"
        :src="profile.avatarURL"
        alt="avatar"
        style="width: 72px; height: 72px; object-fit: cover; border-radius: 50%; margin: 0 auto;"
      >
      <h2 slot="title">
        {{ t('settings.profileData.title') }}
      </h2>
      <section
        class="fieldset"
        style="margin-top: 12px"
      >
        <cyan-textfield
          :label="t('fields.profile.nick')"
          :value="profile.nick"
          style="margin-bottom: 8px; margin-top: 8px;"
          @blur="onNickChange($event.target.value)"
        />
        <cyan-textarea
          collapse
          :label="t('fields.profile.bio')"
          :value="profile.bio"
          @blur="onBioChange($event.target.value)"
        />
        <cyan-toolbar>
          <cyan-button
            noun="arrow-right"
            :label="t('action.toProfile')"
            @click="$router.push('/profiles/'+uid)"
          />
          <cyan-spacer />
          <InsertAssetButton
            :label="t('action.chooseAvatar')"
            noun="avatar"
            @insert="onSelectAvatar($event)"
          />
        </cyan-toolbar>
      </section>
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