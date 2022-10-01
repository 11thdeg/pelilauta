<script lang="ts" setup>
import NavButton from './NavButton.vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useSession } from '../../composables/useSession'

const { t } = useI18n()
const route = useRoute()

const { admin, anonymous } = useSession()
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
      noun="mekanismi"
      :label="t('sites.title')"
      to="/sites"
      :active="route.path === '/sites'"
    />
    <NavButton
      v-if="!anonymous"
      noun="assets"
      :label="t('assets.title')"
      to="/assets"
      :active="route.path === '/assets'"
    />
    <cyan-spacer />
    <NavButton
      v-if="admin"
      noun="admin"
      :label="t('admin.settings.title')"
      to="/admin/settings"
      :active="route.path === '/admin/settings'" 
    />
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