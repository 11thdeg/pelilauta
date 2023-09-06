<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CustomUrlsToggleButton from './CustomUrlsToggleButton.vue'

const { t } = useI18n()
</script>

<template>
  <section>
    <h3>{{ t('site.tools.config.title') }}</h3>
    <p class="TypeBody2 lowEmphasis">
      {{ t('site.tools.config.info') }}
    </p>
    <fieldset>
      <legend>{{ t('site.tools.config.tweaks') }}</legend>
      <CustomUrlsToggleButton />
    </fieldset>
  </section>
</template>