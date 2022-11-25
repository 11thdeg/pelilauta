<script lang="ts" setup>
import NavButton from '../navigation/NavButton.vue'
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
    <router-link to="/">
      <cyan-navigation-button
        noun="fox"
        :active="route.path === '/'"
      />
    </router-link>
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
    <router-link to="/about">
      <cyan-navigation-button
        noun="monsters"
        :label="t('about.title')"
        :active="route.path.startsWith('/about')"
      />
    </router-link>
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