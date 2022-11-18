<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import NavigationTray from '../navigation/NavigationTray.vue'
import { useMeta } from '../../composables/useMeta'

const { t } = useI18n()

const { streams } = useMeta()
</script>
<template>
  <NavigationTray>
    <cyan-toolbar>
      <cyan-icon
        noun="discussion"
        small
      />
      <cyan-toolbar-heading :level="3">
        {{ t('streams.title') }}
      </cyan-toolbar-heading>
    </cyan-toolbar>
    <div class="linkList">
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
    </div>
  </NavigationTray>
</template>

<style lang="sass">
.linkList
  padding: 0 8px
  margin: 0
  display: flex
  flex-direction: column
  gap: 8px
</style>