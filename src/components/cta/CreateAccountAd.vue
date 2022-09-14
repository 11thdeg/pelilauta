<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'

const { anonymous } = useSession()
const { t } = useI18n()
</script>
<template>
  <section
    v-if="anonymous"
    class="CreateAccountAd chroma-box-a rise-b"
  >
    <cyan-icon
      noun="fox"
      xlarge
      dark
      class="adicon"
    />
    <div class="ad">
      <h3>{{ t('cta.createAccount.title') }}</h3>
      <p>{{ t('cta.createAccount.copy') }}</p>
    </div>
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
  position: absolute
  top: var(--cyan-col-gap)
  left: var(--cyan-col-gap)
.ad
  margin-left: 44px
  h3
    margin-top: 0

</style>