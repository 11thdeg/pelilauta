<script lang="ts" setup>
import SocialGoogleLoginButton from './SocialGoogleLoginButton.vue'
import SocialFacebookLoginButton from './SocialFacebookLoginButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <article
    id="LoginButtonContainer"
    class="Column card rise-a"
  >
    <h3>{{ t('login.socialLoginForm.title') }}</h3>
    <p class="TypeBody2">
      {{ t('login.socialLoginForm.info') }}
    </p>
    
    <div class="buttons">
      <SocialGoogleLoginButton />
      <SocialFacebookLoginButton />
    </div>

    <p
      class="TypeBody2"
      style="margin-top: 4px; margin-bottom: 0"
    >
      {{ t('login.firstTime') }}
    </p>
  </article>
</template>

<style lang="sass" scoped>
.buttons
  display: flex
  flex-direction: column
  align-items: start
  justify-content: center
  margin: 0 auto
  cyan-button
    margin: 0
    padding: 0
</style>