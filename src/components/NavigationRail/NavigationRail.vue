<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useSession } from '../../composables/useSession'
import AccountNavButton from '../actions/AccountNavButton.vue'
import AssetsNavigationButton from '../AssetsNavigationButton/AssetsNavigationButton.vue'
import NotificationNavigationButton from '../NotificationNavigationButton/NotificationNavigationButton.vue'

const { t } = useI18n()
const route = useRoute()

const { admin } = useSession()
</script>

<template>
  <nav
    id="NavigationRail"
    class="hideOnMobile"
  >
    <router-link to="/">
      <cyan-navigation-button
        noun="fox"
        :active="route.path === '/'"
      />
    </router-link>
    <NotificationNavigationButton :label="t('inbox.title')" />
    <router-link to="/streams">
      <cyan-navigation-button
        noun="discussion"
        :label="t('streams.title')"
        :active="route.path.startsWith('/streams')"
      />
    </router-link>
  
    <router-link to="/sites">
      <cyan-navigation-button
        noun="mekanismi"
        :label="t('sites.title')"
        :active="route.path.startsWith('/sites')"
      />
    </router-link>
    <AssetsNavigationButton :label="t('assets.title')" />
    <cyan-spacer />
    <router-link to="/admin/settings">
      <cyan-navigation-button
        v-if="admin"
        noun="admin"
        :label="t('admin.settings.title')"
        :active="route.path === '/admin'"
      />
    </router-link>
    <router-link to="/about">
      <cyan-navigation-button
        noun="monsters"
        :label="t('about.title')"
        :active="route.path.startsWith('/about')"
      />
    </router-link>
    <AccountNavButton />
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
  // background: linear-gradient(-42deg,var(--chroma-secondary-c),var(--chroma-secondary-d))
  padding-top: 4px
  gap: 12px
  padding-bottom: 12px
  box-sizing: border-box
</style>