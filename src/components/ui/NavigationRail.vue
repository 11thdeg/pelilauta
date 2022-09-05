<script lang="ts" setup>
import NavButton from './NavButton.vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
</script>

<template>
  <nav
    id="NavigationRail"
    class="hideOnMobile"
  >
    <NavButton
      noun="fox"
      :label="t('app.title')"
      to="/"
      :active="route.path === '/'"
    />
    <NavButton
      noun="assets"
      :label="t('assets.title')"
      to="/assets"
      :active="route.path === '/assets'"
    />
    <cyan-spacer />
    <NavButton
      noun="stylebook"
      :label="t('about.title')"
      to="/about"
      :active="route.path === '/about'"
    />
  </nav>
</template>

<style lang="sass" scoped>
#NavigationRail
  display: flex
  flex-direction: column
  align-items: center
  position: fixed
  top: 0px
  left: 0px
  width: 72px
  height: 100vh
  z-index: var(--z-index-navigation)
  background-color: var(--chroma-secondary-b)
  padding-top: 0px
</style>