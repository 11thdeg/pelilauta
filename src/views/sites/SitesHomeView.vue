<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import AppBar from '../../components/ui/AppBar.vue'
import SiteList from '../../components/sites/SiteList.vue'

const { t } = useI18n()
</script>
<template>
  <div class="SitesHomeView">
    <AppBar
      :title="t('sites.title')"
      noun="mekanismi"
    />
    <main class="bookLayout">
      <SiteList />
    </main>
  </div>
</template>