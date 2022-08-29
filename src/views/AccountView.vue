<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../components/ui/TopBar.vue'

const { t } = useI18n()
</script>

<template>
  <TopBar :title="t('account.title')" />
  <main class="bookLayout">
    <article class="Column">
      Account data
    </article>
    <article class="Column">
      Profile data
    </article>
  </main>
</template>