<script lang="ts" setup>
import { FacebookAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useI18n } from 'vue-i18n'
import { logEvent } from '../../utils/logHelpers'

const t = useI18n().t

function socialFacebookLogin () {
  const provider = new FacebookAuthProvider()
  provider.addScope('email')
  signInWithPopup(getAuth(), provider).then(() => {
    logEvent('Login', { vendor: 'Facebook' })
  })
}
</script>

<template>
  <cyan-button
    text
    noun="facebook"
    :label="t('login.withFacebook')"
    @click.prevent="socialFacebookLogin"
  />
</template>