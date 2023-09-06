<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>
<template>
  <article class="Column column">
    <fieldset>
      <legend>{{ t('page.craft.title') }}</legend>
      <input
        type="text" 
        placeholder="Page Title"
      >
    </fieldset>
  </article>
</template>