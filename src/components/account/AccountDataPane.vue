<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { logError } from '../../utils/logHelpers';
import { toDisplayString } from '../../utils/toDisplayString'

const { t } = useI18n()
const { account, active, profile} = useSession()
    

function setNickname (nickname: string) {
  logError(`setNickname: ${nickname}`, 'not implemented')
}
</script>
    
<template>
  <article
    v-if="active"
    class="AccountSettingsPane Column"
  >
    <h2>{{ t('settings.accountDataPane.title') }}</h2>
    <section>
      <h3>{{ t('settings.accountDataPane.ssoTitle') }}</h3>
      <p class="lowEmphasis">
        {{ t('settings.accountDataPane.ssoDescription') }}
      </p>
      <div class="dataTable">
        <!-- uid -->
        <p class="tableHead">
          {{ t('account.field.uid') }}
        </p>
        <p>{{ account.uid }}</p>

        <!-- Email -->
        <p class="tableHead">{{ t('account.field.email') }}</p>
        <p>{{ account.email }}</p>
        
        <!-- Name -->
        <p class="tableHead">{{ t('account.field.displayName') }}</p>
        <p>
          {{ account.displayName }}
          <cyan-button
            :label="t('action.useInApp')"
            text
            @click="setNickname(account.displayName)"
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
    <section>
      <h4>App Metadata</h4>
      <p>This data is managed by the App, and stored to your private profile visible only to you and the administrative users</p>
      <div class="dataGrid">
        <p class="headCell">
          LightMode
        </p>
        <p>
          {{ account.lightMode }}
        </p>
        <p class="headCell">
          Last login
        </p>
        <p>
          {{ toDisplayString(account.updatedAt) }}
        </p>
        <p class="headCell">
          UI Locale
        </p>
        <p>
          {{ account.locale }}
        </p>
      </div>
    </section>
    <section>
      <h4>{{ t('profile.title') }}</h4>
      <div class="titledList">
        <h4>{{ t('profile.fields.nickname') }}</h4>
        <p>{{ profile.nick }}</p>
        <h4>{{ t('profile.fields.avatarurl') }}</h4>
        <p>
          <a
            :href="profile.avatarURL"
            target="_new"
          >{{ profile.avatarURL }}</a>
        </p>
      </div>
    </section>
  </article>
</template>
