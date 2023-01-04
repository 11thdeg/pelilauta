<script lang="ts" setup>
import { Profile } from '@11thdeg/skaldstore';
import { doc, getFirestore, updateDoc } from '@firebase/firestore';
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { useSnack } from '../../composables/useSnack';
import WithLoader from '../ui/WithLoader.vue'

const { t } = useI18n()
const { account, active} = useSession()
const { pushSnack } = useSnack()

async function setPhotoAsAvatar () {
  const profileDoc = doc(
    getFirestore(),
    Profile.collectionName,
    account.value.uid
  )
  await updateDoc(profileDoc, {
    avatarURL: account.value.photoURL
  })
  pushSnack('snacks.accountPhotoSetAsAvatar')
}

</script>

<template>
  <WithLoader :suspended="!active">
    <section class="ssoDataSection">
      <!-- Login info -->
      <section>
        <h3>{{ t('settings.accountDataPane.ssoTitle') }}</h3>
        <p class="lowEmphasis TypeBody2">
          {{ t('settings.accountDataPane.ssoDescription') }}
        </p>
        <div class="dataTable">
          <!-- uid -->
          <p class="tableHead">
            {{ t('fields.account.uid') }}
          </p>
          <p>{{ account.uid }}</p>

          <!-- Email -->
          <p class="tableHead">
            {{ t('fields.account.email') }}
          </p>
          <p>{{ account.email }}</p>
        
          <!-- Name -->
          <p class="tableHead">
            {{ t('fields.account.displayName') }}
          </p>
          <p>
            {{ account.displayName }}
          </p>

          <!-- Photo URL -->
          <p class="tableHead">
            {{ t('fields.account.photoURL') }}
          </p>
          <p>
            {{ account.photoURL }} <br>
            <cyan-button
              :label="t('settings.accountDataPane.setPhotoAsAvatar')"
              noun="avatar" 
              secondary
              @click="setPhotoAsAvatar"
            />
          </p>
        </div>
        <p class="TypeBody2 lowEmphasis">
          This data is not erased automatically, when you delete your profile, as it's not saved to the App data. The Authentication scrapped manually for 
          users who's data is deleted from the platform.
        </p>
        <p class="TypeBody2 lowEmphasis">
          More info on how Firestore saves the authentication data can be found here 
          <a href="https://firebase.google.com/support/privacy">https://firebase.google.com/support/privacy</a>
        </p>
        <p class="TypeBody2 lowEmphasis">
          More info on what data is saved from your logins, can be found on the source code responsible for the Account persistence: 
          <a href="https://github.com/11thdeg/skaldstore/blob/main/src/Account.ts">https://github.com/11thdeg/skaldstore/blob/main/src/Account.ts</a>
        </p>
      </section>
    </section>
  </WithLoader>
</template>