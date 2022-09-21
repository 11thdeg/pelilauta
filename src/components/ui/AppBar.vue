<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import ProfileButton from '../actions/ProfileButton.vue'

const { t } = useI18n()
</script>
<template>
  <nav id="AppBar">
    <h1 class="TypeHeadline5">
      {{ t('app.title') }}
    </h1>
    <cyan-spacer />
    <cyan-lightmode-toggle class="inAppBar" />
    <ProfileButton />
  </nav>
</template>

<style scoped lang="sass">
#AppBar
  margin: 0
  paddin: 0
  display: flex
  justify-content: space-between
  align-items: top
  height: 56px
.inAppBar
  margin-top: 8px
</style>