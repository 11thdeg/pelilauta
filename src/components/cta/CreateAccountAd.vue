<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'

const { anonymous } = useSession()
const { t } = useI18n()
</script>
<template>
  <cyan-card
    v-if="anonymous"
    elevation="1"
    class="CreateAccountAd chroma-box-b"
  >
    <cyan-icon
      noun="fox"
      xlarge
      dark
      class="adicon"
      style="margin-bottom: 12px"
    />
    <h3>{{ t('cta.createAccount.title') }}</h3>
       
    <p class="ad TypeBody2">
      {{ t('cta.createAccount.copy') }}
    </p>
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        text
        dark
        noun="avatar"
        :label="t('action.loginOrRegister')"
        @click.prevent="() => $router.push('/login')"
      />
      <cyan-spacer />
    </cyan-toolbar>
  </cyan-card>
</template>

<style lang="sass" scoped>
.CreateAccountAd
  position: relative
.adicon
  display: block
  margin: 0 auto
h3, p
  text-align: center

</style>