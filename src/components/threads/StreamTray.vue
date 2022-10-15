<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import NavigationTray from '../navigation/NavigationTray.vue'
import { useMeta } from '../../composables/useMeta'

const { t } = useI18n()

const { streams } = useMeta()
</script>
<template>
  <NavigationTray>
    <h1>{{ t('streams.title') }}</h1>
    <router-link
      v-for="stream in streams"
      :key="stream.slug"
      :to="'/streams/' + stream.slug"
    >
      <cyan-nav-button
        style="margin-left: -12px; padding-left: 12px;"
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