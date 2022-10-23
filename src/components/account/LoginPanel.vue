<script lang="ts" setup>
import EmailLoginForm from './EmailLoginForm.vue'
import SocialGoogleLoginButton from './SocialGoogleLoginButton.vue'
import SocialFacebookLoginButton from './SocialFacebookLoginButton.vue'
</script>

<template>
  <article
    id="LoginButtonContainer"
    class="Column"
  >
    <EmailLoginForm />
    <SocialGoogleLoginButton />
    <SocialFacebookLoginButton />
  </article>
</template>

<style lang="sass" scoped>
#LoginButtonContainer
  display: flex
  flex-direction: column
  align-items: stretch

</style>