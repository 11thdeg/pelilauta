<script lang="ts" setup>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useI18n } from 'vue-i18n'
import { logEvent } from '../../utils/logHelpers'

const t = useI18n().t

function socialGoogleLogin () {
  const provider = new GoogleAuthProvider()
  provider.addScope('email')
  signInWithPopup(getAuth(), provider).then(() => {
    logEvent('Login', { vendor: 'Google' })
  })
}
</script>

<template>
  <cyan-button
    text
    noun="google"
    :label="t('login.withGoogle')"
    @click.prevent="socialGoogleLogin"
  />
</template>