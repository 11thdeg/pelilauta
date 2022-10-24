<script lang="ts" setup>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { logDebug, logEvent } from '../../utils/logHelpers'

const props = defineProps<{
  to: string
}>()

const t = useI18n().t
const router = useRouter()

async function socialGoogleLogin () {
  const provider = new GoogleAuthProvider()
  provider.addScope('email')
  await signInWithPopup(getAuth(), provider)
  logEvent('Login', { vendor: 'Google' })
  logDebug('Login successful, rerouting' + props.to)
  router.push(props.to)
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