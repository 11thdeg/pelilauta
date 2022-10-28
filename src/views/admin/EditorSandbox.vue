<script lang="ts" setup>
import { computed, ref } from 'vue'
import TopBar from '../../components/navigation/TopBar.vue'
import { marked,  } from 'marked'
import { logDebug } from '../../utils/logHelpers'
import Europa from 'europa'

const content = ref('## Hello World')

const preview = computed(() => {
  return marked(content.value)
}) 

const paste = (e: ClipboardEvent) => {
  e.preventDefault()

  // We got a clipboard event, let's see what it contains
  const clipboardData = e.clipboardData
  if(!clipboardData) return

  const html = e.clipboardData.getData('text/html')
  if (html) {
    const europa = new Europa()
    logDebug('HTML -> Markdown', europa.convert(html))
    const markdown = europa.convert(html)
    const el = document.activeElement as HTMLTextAreaElement
    if (el) {
      logDebug('Inserting Markdown', markdown, el)
      el.value += markdown
    }
  }
}
</script>

<template>
  <TopBar title="Editor Sandbox" />
  <main class="bookLayout">
    <article class="Column double-cut">
      <h1>Editor</h1>
      <cyan-textarea
        v-once
        rows="11"
        :value="content"
        @change="content = $event.target.value"
        @paste="paste"
      >
        {{ content }}
      </cyan-textarea>
    </article>
    <article class="Column double-cut">
      <h1>Preview</h1>
      <div :innerHTML="preview" />
    </article>
  </main>
</template>