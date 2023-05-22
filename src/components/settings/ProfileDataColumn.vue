<script lang="ts" setup>
import { Profile } from '@11thdeg/skaldstore'
import { doc, getFirestore, updateDoc } from '@firebase/firestore'
import { useI18n } from 'vue-i18n'
import { useAssets } from '../../composables/useAssets'
import { useProfile } from '../../composables/useSession/useProfile'
import { useSession } from '../../composables/useSession'
import InsertAssetButton from '../InsertAssetButton/InsertAssetButton.vue'
import { logDebug } from '../../utils/logHelpers'
import { useRouter } from 'vue-router'
    
const { t } = useI18n()
const { uid } = useSession()
const { profile } = useProfile()
const router = useRouter()

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
  <article
    v-if="profile"
    class="ProfileDataColumn Column"
  >
    <h2 slot="title">
      {{ t('settings.profileData.title') }}
    </h2>
    <section class="flex flex-row">
      <img
        :src="profile.avatarURL"
        alt="avatar image"
        style="width: 96px; height: 96px; object-fit: cover; border-radius: 50%;"
      >
      <div
        class="fieldset flex-grow"
        style="flex-grow: 1"
      >
        <cyan-textfield
          :label="t('fields.profile.nick')"
          :value="profile.nick"
          style="margin-bottom: 8px; margin-top: 8px; width: 100%;"
          @blur="onNickChange($event.target.value)"
        />
        <div>
          <InsertAssetButton
            :label="t('action.chooseAvatar')"
            noun="avatar"
            @insert="onSelectAvatar($event)"
          />
        </div>
      </div>
    </section>
    
    
    <section
      class="fieldset"
      style="margin-top: 12px"
    >
      <cyan-textarea
        collapse
        :label="t('fields.profile.bio')"
        :value="profile.bio"
        @blur="onBioChange($event.target.value)"
      />
      <hr>
      <cyan-toolbar>
        <cyan-spacer />
        <button
          class="secondary"
          @click="router.push('/profiles/'+uid)"
        >
          <cyan-icon
            noun="outlink"
            small
          />
          {{ $t('action.toProfile') }}
        </button>
      </cyan-toolbar>
    </section>
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