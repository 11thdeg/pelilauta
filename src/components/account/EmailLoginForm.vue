<script lang="ts" setup>
import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from '@firebase/auth'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { logError } from '../../utils/logHelpers'

const emailAdress = ref('')
const verify = ref(isSignInWithEmailLink(getAuth(), window.location.href))
const t = useI18n().t

function singInWithEmail () {
  if (!emailAdress.value) {
    // TODO: show error in snackbar
    logError('snackbar not implemented', `pushSnack('snacks.invalidEmail')`)
    return
  }
  signInWithEmailLink(getAuth(), emailAdress.value, window.location.href)
    .then(() => {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn')
    })
    .catch((error: Error) => {
      // TODO: show error in snackbar
      logError('snackbar not implemented', `pushSnack('snacks.error', { params: { topic: error.message }})`)
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

  return sendSignInLinkToEmail(getAuth(), emailAdress.value, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', emailAdress.value)
      // TODO: show error in snackbar
      logError('snackbar not implemented', `pushSnack('snacks.emailSent')`)
      // pushSnack('snacks.emailSent')
    })
    .catch((error: Error) => {
      // TODO: show error in snackbar
      logError('snackbar not implemented', `pushSnack('snacks.error', { params: { topic: error.message }})`)
      //pushSnack('snacks.error', { params: { topic: error.message }})
      logError(error)
  })
}

</script>

<template>
  <section id="emailLoginForm">
    <div
      v-if="verify"
      class="verifyWarning"
    >
      {{ t('login.verifyEmailLoginMessage') }}
    </div>

    <template
      v-if="!verify"
    >
      <div>
        <h3>
          {{ t('login.emailLoginForm.title') }}
        </h3>
      </div>
      <cyan-textfield
        :value="emailAdress"
        :label="t('login.emailLoginForm.emailFieldLabel')"
        @change="emailAdress = $event.target.value"
      />
      <cyan-button
        :disabled="!emailAdress"
        :label="t('login.withEmail')"
        @click="sendLinkToEmail"
      />
    </template>
  </section>
</template>

<style lang="sass" scoped>
#emailLoginForm
  display: flex
  flex-direction: column
  align-items: stretch
  gap: 8px
</style>