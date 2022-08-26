<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <nav id="AppBar">
    <h1 class="TypeHeadline5">
      {{ t('app.title') }}
    </h1>
  </nav>
</template>