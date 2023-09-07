<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CustomUrlsToggleButton from './CustomUrlsToggleButton.vue'
import SiteVisibilityToggle from './SiteVisibilityToggle.vue'

const { t } = useI18n()
</script>

<template>
  <section>
    <h4>{{ t('site.tools.config.title') }}</h4>
    <p class="TypeBody2 lowEmphasis">
      {{ t('site.tools.config.info') }}
    </p>
    <fieldset>
      <legend>{{ t('site.tools.config.tweaks') }}</legend>
      <SiteVisibilityToggle />
      <CustomUrlsToggleButton />
    </fieldset>
  </section>
</template>