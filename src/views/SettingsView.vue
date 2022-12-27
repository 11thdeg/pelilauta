<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import SsoDataSection from '../components/settings/SsoDataSection.vue'
import AccountDataSection from '../components/settings/AccountDataSection.vue'
import AppSettingsColumn from '../components/settings/AppSettingsColumn.vue'
import ProfileDataColumn from '../components/settings/ProfileDataColumn.vue'
import { onMounted } from 'vue'
import { useTitle } from '@vueuse/core'

const { t } = useI18n()

onMounted(() => {
  useTitle().value = t('app.title') + ' / ' + t('settings.title')
})
</script>

<template>
  <cyan-top-app-bar
    sticky
    modal
    @back="$router.back()"
  >
    <h3>{{ $t('settings.title') }}</h3>
  </cyan-top-app-bar>
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