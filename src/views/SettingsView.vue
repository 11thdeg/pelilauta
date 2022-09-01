<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../components/ui/TopBar.vue'
import ProfileDataPane from '../components/account/ProfileDataPane.vue'
import SsoDataSection from '../components/settings/SsoDataSection.vue'
import AccountDataSection from '../components/settings/AccountDataSection.vue'

const { t } = useI18n()
</script>

<template>
  <TopBar :title="t('account.title')" />
  <main class="dashboardLayout">
    <ProfileDataPane />
    <article class="Column">
      <h2>{{ t('settings.accountDataPane.title') }}</h2>
      <AccountDataSection />
      <SsoDataSection />
    </article>
  </main>
</template>