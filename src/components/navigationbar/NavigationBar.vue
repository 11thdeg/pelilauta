<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import NavButton from '../navigation/NavButton.vue'
import { useUxState } from '../../composables/useUXState'
import AccountNavButton from '../actions/AccountNavButton.vue'
import { useRoute } from 'vue-router'
import { useSession } from '../../composables/useSession'
import NotificationNavigationButton from '../NotificationNavigationButton/NotificationNavigationButton.vue'

const { fabTrayVisible, fieldFocused } = useUxState()
const t = useI18n().t
const route = useRoute()
const { anonymous } = useSession()

</script>
<template>
  <div
    v-if="!fieldFocused"
    id="NavigationBarShadow"
    class="onlyOnMobile"
  />
  <nav
    v-if="!fieldFocused"
    id="NavigationBar"
    class="onlyOnMobile"
    :class="{ withFabs: fabTrayVisible }"
  >
    <NavButton
      noun="fox"
      label="Pelilauta"
      to="/"
    />
    <NavButton
      noun="mekanismi"
      :label="t('sites.title')"
      to="/sites"
    />
    <router-link to="/assets">
      <cyan-navigation-button
        :disabled="anonymous"
        noun="assets"
        :active="route.path === '/assets'"
      />
    </router-link>
    <NotificationNavigationButton />
    <AccountNavButton />
  </nav>
</template>

<style lang="sass" scoped>
 #NavigationBar
  position: fixed
  bottom: 0%
  left: 0
  width: 100vw
  display: flex
  margin: 0
  padding: 0 8px
  justify-content: space-between
  box-sizing: border-box
  background: linear-gradient(-42deg,var(--chroma-secondary-b),var(--chroma-secondary-d))
  z-index: var(--pelilauta-z-index-navigation)
  align-items: center
  &.withFabs
    clip-path: polygon(0 0, calc(100% - 76px) 0, calc(100% - 64px) 8px, calc(100% - 24px) 8px, calc(100% - 12px) 0, 100% 0, 100% 100%, 0 100%)
#NavigationBarShadow
  content: ''
  position: fixed
  bottom: 58px
  left: 0
  width: 100vw
  height: 48px
  z-index: calc(var(--z-index-navigation) - 10 )
  background: linear-gradient(0deg, rgba(0,35,55,1) 0%, rgba(0,35,55,0) 100%)
</style>
