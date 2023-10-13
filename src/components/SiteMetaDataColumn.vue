<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { version } from '../../package.json'

const { t } = useI18n()
</script>

<template>
  <article class="small column">
    <cn-card elevation="0">
      <section style="display: flex; justify-content: center;align-items: center; gap: 8px;margin:16px">
        <cyan-icon
          noun="fox"
          large
        />
        <cyan-icon
          noun="d20"
          small
        />
        <cyan-icon
          noun="mekanismi"
          large
        />
      </section>
      <h4
        class="downscaled"
        style="text-align: center; margin-bottom: 16px"
      >
        Pelilauta / Mekanismi
      </h4>
      <section class="dataTable">
        <p class="TypeBody2">
          {{ t('app.meta.release') }}
        </p>
        <p class="TypeBody2">
          {{ version }}
        </p>
        <p class="TypeBody2">
          {{ t('app.meta.source') }}
        </p>
        <p class="TypeBody2">
          <a href="https://github.com/11thdeg/pelilauta">Pelilauta (MIT)</a><br>
          <a href="https://github.com/11thdeg/cyan-elements">Cyan (MIT)</a><br>
          <a href="https://github.com/11thdeg/skaldstore">Skaldstore (MIT)</a>
        </p>
      </section>
    </cn-card>
  </article>
</template>