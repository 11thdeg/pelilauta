<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import SsoDataSection from '../components/settings/SsoDataSection.vue'
import AccountDataSection from '../components/settings/AccountDataSection.vue'
import AppSettingsColumn from '../components/settings/AppSettingsColumn.vue'
import ProfileDataColumn from '../components/settings/ProfileDataColumn.vue'
import AppBar from '../components/navigation/AppBar.vue'

const { t } = useI18n()
</script>

<template>
  <AppBar :title="t('settings.title')" />
  <main class="dashboardLayout">
    <AppSettingsColumn />
    <ProfileDataColumn />
    <article class="Column">
      <h2>{{ t('settings.accountDataPane.title') }}</h2>
      <AccountDataSection />
      <SsoDataSection />
    </article>
  </main>
</template>