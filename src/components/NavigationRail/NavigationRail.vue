<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useSession } from '../../composables/useSession'
import AccountNavButton from '../actions/AccountNavButton.vue'
import AssetsNavigationButton from '../AssetsNavigationButton/AssetsNavigationButton.vue'
import NotificationNavigationButton from '../NotificationNavigationButton/NotificationNavigationButton.vue'

const route = useRoute()
const { admin } = useSession()

</script>

<template>
  <nav
    id="NavigationRail"
    class="rail"
  >
    <!-- Link to the front page, always visible-->
    <router-link to="/">
      <cyan-navigation-button
        noun="fox"
        :active="route.path === '/'"
      />
    </router-link>

    <!-- Link to the inbox, hidden on anonymous-->
    <NotificationNavigationButton :label="$t('inbox.title')" />

    <!-- Link to the streams, always visible-->
    <router-link to="/forum">
      <cyan-navigation-button
        noun="discussion"
        :label="$t('streams.title')"
        :active="route.path.startsWith('/forum')"
      />
    </router-link>
  
    <!-- Link to the sites, always visible-->
    <router-link to="/sites">
      <cyan-navigation-button
        noun="mekanismi"
        :label="$t('sites.title')"
        :active="route.path.startsWith('/sites')"
      />
    </router-link>

    <!-- Link to the library, hidden on anonymous -->
    <AssetsNavigationButton :label="$t('library.title')" />

    <!-- Spacer, rest of the links are on bottom of the rail -->
    <cyan-spacer />

    <!-- Link to the admin settings, hidden for non-admins -->
    <router-link to="/admin/settings">
      <cyan-navigation-button
        v-if="admin"
        noun="admin"
        :label="$t('admin.settings.title')"
        :active="route.path === '/admin'"
      />
    </router-link>

    <!-- Link to the about page, always visible-->
    <router-link to="/about">
      <cyan-navigation-button
        noun="monsters"
        :label="$t('about.title')"
        :active="route.path.startsWith('/about')"
      />
    </router-link>

    <!-- Link to the account page, modal depending on login state -->
    <AccountNavButton />
  </nav>
</template>