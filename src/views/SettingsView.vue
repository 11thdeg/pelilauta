<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../components/ui/TopBar.vue'
import SsoDataSection from '../components/settings/SsoDataSection.vue'
import AccountDataSection from '../components/settings/AccountDataSection.vue'
import AppSettingsColumn from '../components/settings/AppSettingsColumn.vue'
import ProfileDataColumn from '../components/settings/ProfileDataColumn.vue'

const { t } = useI18n()
</script>

<template>
  <TopBar :title="t('account.title')" />
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