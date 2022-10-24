<script lang="ts" setup>
import { FacebookAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { logEvent } from '../../utils/logHelpers'

const props = defineProps<{
  to: string
}>()

const t = useI18n().t
const router = useRouter()

function socialFacebookLogin () {
  const provider = new FacebookAuthProvider()
  provider.addScope('email')
  signInWithPopup(getAuth(), provider).then(() => {
    logEvent('Login', { vendor: 'Facebook' })
    router.push(props.to)
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