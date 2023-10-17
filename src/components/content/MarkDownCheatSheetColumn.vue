<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <article class="Column column small">
    <cyan-card
      elevation="1"
      class="chroma-box-a"
    >
      <h4>{{ t('app.markdowncheatsheet.title') }}</h4>
      <p class="TypeBody2 lowEmphasis">
        {{ t('app.markdowncheatsheet.description') }}
      </p>
      <hr>
      <h5>{{ t('app.markdowncheatsheet.headings') }}</h5>
      <p><cyan-code># Head 1</cyan-code></p>
      <p><cyan-code>## Head 2</cyan-code></p>
      <p><cyan-code>### Head 3</cyan-code></p>
      <hr>
      <h5>{{ t('app.markdowncheatsheet.text') }}</h5>
      <p><cyan-code>**Bold**</cyan-code></p>
      <p><cyan-code>*Italic*</cyan-code></p>
      <p><cyan-code>~~Strikethrough~~</cyan-code></p>
      <p><cyan-code>`Code`</cyan-code></p>
      <p><cyan-code>```Code Block```</cyan-code></p>
      <p><cyan-code>![Image](https://a/image.png)</cyan-code></p>
      <p><cyan-code>[Link](https://example.com)</cyan-code></p>
    </cyan-card>
  </article>
</template>