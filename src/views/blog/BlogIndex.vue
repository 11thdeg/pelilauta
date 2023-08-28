<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LibraryNavigationTray from '../../components/library/LibraryNavigationTray/LibraryNavigationTray.vue'

const { t } = useI18n()
</script>

<template>
  <cn-app-bar :title="t('blogs.publish.title')" />
  <LibraryNavigationTray />
  <main class="container">
    <h3>{{ t('blogs.publish.title') }}</h3>
  </main>
</template>
