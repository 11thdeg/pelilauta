<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import NavigationTray from '../navigation/NavigationTray.vue'

const { t } = useI18n()
const { admin } = useSession()
</script>

<template>
  <NavigationTray v-if="admin">
    <h1>{{ t('admin.title') }}</h1>
    <p class="TypeBody2 lowEmphasis">
      {{ t('admin.description') }}
    </p>
    <router-link to="/admin/settings">
      <cyan-nav-button
        style="margin-left: -12px; padding-left: 12px;"
        noun="monsters"
      >
        {{ t('admin.settings.title') }}
      </cyan-nav-button>
    </router-link>
    <router-link to="/admin/users">
      <cyan-nav-button
        style="margin-left: -12px; padding-left: 12px;"
        noun="avatar"
      >
        {{ t('admin.users.title') }}
      </cyan-nav-button>
    </router-link>
  </NavigationTray>
</template>