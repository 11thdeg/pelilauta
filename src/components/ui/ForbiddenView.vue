<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <TopBar :title="t('error.forbidden')" />
  <main class="singleColumnLayout">
    <p>{{ t('error.forbidden.description') }}</p>
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        :label="t('action.back')"
        noun="arrow-left"
        @click="$router.back()"
      />
      <cyan-spacer />
    </cyan-toolbar>
  </main>
</template>