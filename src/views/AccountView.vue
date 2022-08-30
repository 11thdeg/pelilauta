<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../components/ui/TopBar.vue'
import AccountDataPane from '../components/account/AccountDataPane.vue';
import ProfileDataPane from '../components/account/ProfileDataPane.vue';

const { t } = useI18n()
</script>

<template>
  <TopBar :title="t('account.title')" />
  <main class="bookLayout">
    <AccountDataPane />
    <ProfileDataPane />
  </main>
</template>