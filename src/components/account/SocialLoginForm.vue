<script lang="ts" setup>
import SocialGoogleLoginButton from './SocialGoogleLoginButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  to: string
}>()
</script>

<template>
  <article
    id="LoginButtonContainer"
    class="column surface elevation-1"
  >
    <h3 class="downscaled">
      {{ t('login.socialLoginForm.title') }}
    </h3>
    <p class="TypeBody2">
      {{ t('login.socialLoginForm.info') }}
    </p>
    
    <div class="buttons">
      <SocialGoogleLoginButton :to="props.to" />
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