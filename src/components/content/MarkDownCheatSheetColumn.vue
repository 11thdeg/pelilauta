<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <article class="Column">
    <div class="card chroma-box-a">
      <h3>{{ t('app.markdowncheatsheet.title') }}</h3>
      <p>{{ t('app.markdowncheatsheet.description') }}</p>
      <hr>
      <h4>{{ t('app.markdowncheatsheet.headings') }}</h4>
      <p><cyan-code># Head 1</cyan-code></p>
      <p><cyan-code>## Head 2</cyan-code></p>
      <p><cyan-code>### Head 3</cyan-code></p>
      <hr>
      <h4>{{ t('app.markdowncheatsheet.text') }}</h4>
      <p><cyan-code>**Bold**</cyan-code></p>
      <p><cyan-code>*Italic*</cyan-code></p>
      <p><cyan-code>~~Strikethrough~~</cyan-code></p>
      <p><cyan-code>`Code`</cyan-code></p>
      <p><cyan-code>```Code Block```</cyan-code></p>
      <p><cyan-code>![Image](https://a/image.png)</cyan-code></p>
      <p><cyan-code>[Link](https://example.com)</cyan-code></p>
    </div>
  </article>
</template>