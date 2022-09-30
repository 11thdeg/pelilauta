<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <article class="Column card chroma-box-a">
    <h1>{{ t('guides.markdown.title') }}</h1>
  </article>
</template>