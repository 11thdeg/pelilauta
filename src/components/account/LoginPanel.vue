<script lang="ts" setup>
import EmailLoginForm from './EmailLoginForm.vue'
import SocialGoogleLoginButton from './SocialGoogleLoginButton.vue'
import SocialFacebookLoginButton from './SocialFacebookLoginButton.vue'
import { useI18n } from 'vue-i18n'

const t = useI18n().t
</script>

<template>
  <article
    id="LoginButtonContainer"
    class="Column"
  >
    <div>
      <h2>
        {{ t('login.title') }}
      </h2>
    </div>
    <SocialGoogleLoginButton />
    <SocialFacebookLoginButton />
    <hr>
    <EmailLoginForm />
  </article>
</template>

<style lang="sass" scoped>
#LoginButtonContainer
  display: flex
  flex-direction: column
  align-items: stretch

</style>