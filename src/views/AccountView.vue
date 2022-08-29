<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../components/ui/TopBar.vue'
import AccountDataPane from '../components/account/AccountDataPane.vue';

const { t } = useI18n()
</script>

<template>
  <TopBar :title="t('account.title')" />
  <main class="bookLayout">
    <AccountDataPane />
    <article class="Column">
      Profile data
    </article>
  </main>
</template>