<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useMeta } from '../../composables/useMeta'

const { t } = useI18n()

const { streams } = useMeta()
</script>
<template>
  <nav class="cn-tray">
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
        class="button tray-button"
      >
        <div style="display:flex; width: 100%">
          <p style="margin: 0">
            {{ stream.name }}
          </p>
          <cyan-spacer />
          <cyan-tag :label="stream.count" />
        </div>
      </router-link>
    </div>
  </nav>
</template>

<style lang="sass">
.linkList
  padding: 0 8px
  margin: 0
  display: flex
  flex-direction: column
  gap: 8px
</style>