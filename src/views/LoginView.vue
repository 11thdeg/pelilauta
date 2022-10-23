<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import LoginPanel from '../components/account/LoginPanel.vue'
import TopBar from '../components/ui/TopBar.vue'

const { t } = useI18n()
</script>

<template>
  <TopBar :title="t('login.title')" />
  <main class="bookLayout">
    <LoginPanel />
  </main>
</template>