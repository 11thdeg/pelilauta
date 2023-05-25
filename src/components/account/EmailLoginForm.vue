<script lang="ts" setup>
import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from '@firebase/auth'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSnack } from '../../composables/useSnack'
import { logError, logEvent } from '../../utils/logHelpers'

const props = defineProps<{
  to: string
}>()

const t = useI18n().t
const router = useRouter()
const { pushSnack } = useSnack()

const emailAdress = ref('')
const verify = ref(isSignInWithEmailLink(getAuth(), window.location.href))


function singInWithEmail () {
  if (!emailAdress.value) {
    pushSnack(t('login.snacks.invalidEmail'))
    logError('Missing email adress - this should not happen')
    return
  }
  signInWithEmailLink(getAuth(), emailAdress.value, window.location.href)
    .then(() => {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn')
      logEvent('Login', { vendor: 'Email' })
      router.push(props.to)
    })
    .catch((error: Error) => {
      pushSnack(t('login.snacks.error'))
      logError(error)
    })
}

if (verify.value) {
  emailAdress.value = window.localStorage.getItem('emailForSignIn') || ''
  if (emailAdress.value) {
    singInWithEmail()
  }
}

const actionCodeSettings = {
  // URL we want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `https://${window.location.hostname}/login?verify=true`,
  // This must be true.
  handleCodeInApp: true
}
const sendLinkToEmail = async () => {
  if (verify.value) singInWithEmail()

  const adress = emailAdress.value
  emailAdress.value = ''

  return sendSignInLinkToEmail(getAuth(), adress, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', adress)
      pushSnack(t('snacks.login.emailSent'))
    })
    .catch((error: Error) => {
      // TODO: show error in snackbar
      logError('snackbar not implemented', 'pushSnack(\'snacks.error\', { params: { topic: error.message }})')
      pushSnack(t('snacks.login.error'))
      logError(error)
    })
}

</script>

<template>
  <article
    id="emailLoginForm"
    class="Column"
  >
    <cn-card>
      <div
        v-if="verify"
        class="verifyWarning"
      >
        {{ t('login.verifyEmailLoginMessage') }}
      </div>
      <template
        v-if="!verify"
      >
        <h3>
          {{ t('login.emailLoginForm.title') }}
        </h3>
        <p class="TypeBody2">
          {{ t('login.emailLoginForm.info') }}
        </p>
        <from class="fieldset">
          <cyan-textfield
            :value="emailAdress"
            :label="t('login.emailLoginForm.emailFieldLabel')"
            @change="emailAdress = $event.target.value"
          />
          <cyan-toolbar>
            <cyan-spacer />
            <cyan-button
              :disabled="!emailAdress"
              :label="t('login.withEmail')"
              @click="sendLinkToEmail"
            />
          </cyan-toolbar>
        </from>
      </template>
    </cn-card>
  </article>
</template>
