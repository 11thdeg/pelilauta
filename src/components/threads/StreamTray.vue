<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import NavigationTray from '../navigation/NavigationTray.vue'
import { useMeta } from '../../composables/useMeta'

const { t } = useI18n()

const { streams } = useMeta()
</script>
<template>
  <NavigationTray style="padding: 0">
    <cyan-toolbar style="margin: 0">
      <cyan-icon
        noun="discussion"
        small
      />
      <h3>{{ t('streams.title') }}</h3>
    </cyan-toolbar>
    <router-link
      v-for="stream in streams"
      :key="stream.slug"
      :to="'/streams/' + stream.slug"
    >
      <cyan-nav-button
        style="padding-left: 12px;"
        :noun="stream.icon"
      >
        <div style="display:flex; width: 100%">
          <p style="margin: 0">
            {{ stream.name }}
          </p>
          <cyan-spacer />
          <cyan-tag :label="stream.count" />
        </div>
      </cyan-nav-button>
    </router-link>
  </NavigationTray>
</template>