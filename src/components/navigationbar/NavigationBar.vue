<script lang="ts" setup>
import { useUxState } from '../../composables/useUXState'
import AccountNavButton from '../actions/AccountNavButton.vue'
import NotificationNavigationButton from '../NotificationNavigationButton/NotificationNavigationButton.vue'
import AssetsNavigationButton from '../AssetsNavigationButton/AssetsNavigationButton.vue'
import { useRoute } from 'vue-router'

const { fabTrayVisible, fieldFocused } = useUxState()

const route = useRoute()

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
    <router-link to="/">
      <cyan-navigation-button
        noun="fox"
        :active="route.path === '/'"
      />
    </router-link>
    <router-link to="/sites">
      <cyan-navigation-button
        noun="mekanismi"
        :active="route.path.startsWith('/sites')"
      />
    </router-link>
    <AssetsNavigationButton />
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
