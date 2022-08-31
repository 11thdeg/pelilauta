<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { logError } from '../../utils/logHelpers'

const { t } = useI18n()
const { account, active } = useSession()

function setProfilePhoto (url: string) {
  logError(`makePhotoActive: ${url}`, 'not implemented')
}
function setNickname (nickname: string) {
  logError(`setNickname: ${nickname}`, 'not implemented')
}
</script>

<template>
  <article class="Column dontBreakOut">
    <cyan-loader v-if="!active" />
    <template v-else>
      <h2>{{ t('account.accountDataPane.title') }}</h2>
      <p class="TypeBody2">
        {{ t('account.accountDataPane.description') }}
      </p>

      <h3>{{ t('account.accountDataPane.session') }}</h3>
      <section class="dataTable">
        <!-- photoURL -->
        <p><strong>{{ t('account.field.photoURL') }}</strong></p>
        <p>
          <img
            v-if="account.photoURL"
            :src="account.photoURL"
          >
          <span v-else>{{ t('account.field.noPhoto') }}</span>
          <cyan-button
            v-if="account.photoURL"
            :label="t('action.useInApp')"
            text
            @click="setProfilePhoto(account.photoURL)"
          />
        </p>
      </section>

      <h3>{{ t('account.accountDataPane.settings') }}</h3>
      <section class="dataTable">
        <!-- Lightmode -->
        <p><strong>{{ t('account.field.lightMode') }}</strong></p>
        <p>{{ account.lightMode }}</p>
      </section>
    </template>
  </article>
</template>