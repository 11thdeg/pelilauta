<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'

const { anonymous } = useSession()
const { t } = useI18n()
</script>
<template>
  <section
    v-if="anonymous"
    class="CreateAccountAd chroma-box-a"
  >
    <cyan-icon
      noun="fox"
      xlarge
      dark
      class="adicon"
    />
    <h3>{{ t('cta.createAccount.title') }}</h3>
       
    <p class="ad">
      {{ t('cta.createAccount.copy') }}
    </p>
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        text
        dark
        noun="avatar"
        :label="t('action.login')"
      />
      <cyan-button
        noun="add"
        dark
        text
        :label="t('action.register')"
      />
      <cyan-spacer />
    </cyan-toolbar>
  </section>
</template>

<style lang="sass" scoped>
.CreateAccountAd
  padding: var(--cyan-col-gap)
  position: relative
.adicon
  display: block
  margin: 0 auto
h3, p
  text-align: center

</style>