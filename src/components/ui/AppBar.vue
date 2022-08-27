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
    <cyan-icon
      class="clickable hoverable"
      noun="lightmode"
    />
    <ProfileButton />
  </nav>
</template>

<style scoped lang="sass">
#AppBar
  display: flex
  justify-content: space-between
</style>