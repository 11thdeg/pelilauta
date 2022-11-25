<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import NavigationTray from '../NavigationTray/NavigationTray.vue'

const { t } = useI18n()
const { admin } = useSession()
</script>

<template>
  <NavigationTray v-if="admin">
    <section style="padding: 0 12px;">
      <cyan-toolbar>
        <cyan-icon noun="tools" />
        <cyan-toolbar-heading :level="1">
          {{ t('admin.title') }}
        </cyan-toolbar-heading>
      </cyan-toolbar>
      <p class="TypeBody2 lowEmphasis">
        {{ t('admin.description') }}
      </p>
    </section>
    <router-link to="/admin/settings">
      <cyan-nav-button
        noun="monsters"
      >
        {{ t('admin.settings.title') }}
      </cyan-nav-button>
    </router-link>
    <router-link to="/admin/users">
      <cyan-nav-button
        noun="avatar"
      >
        {{ t('admin.users.title') }}
      </cyan-nav-button>
    </router-link>
    <router-link to="/admin/testing-tools">
      <cyan-nav-button
        noun="admin"
      >
        {{ t('admin.testingTools.title') }}
      </cyan-nav-button>
    </router-link>
  </NavigationTray>
</template>