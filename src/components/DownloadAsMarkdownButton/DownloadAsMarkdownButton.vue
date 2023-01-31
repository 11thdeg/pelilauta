<script lang="ts" setup>
import Europa from 'europa'

const props = defineProps<{
  contentEntry: {
    name: string
    htmlContent: string
    markdownContent: string
  }
}>()

function download () {
  const element = document.createElement('a')

  const europa = new Europa()
  const entry = props.contentEntry.markdownContent ? 
    props.contentEntry.markdownContent :
    europa.convert(props.contentEntry.htmlContent)
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(entry))
  
  element.setAttribute('download', encodeURI(props.contentEntry.name) + '.md')
  
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

</script>

<template>
  <button
    class="text"
    @click="download"
  >
    <cyan-icon
      name="download"
      small
    />
    {{ $t('action.downloadAsMarkdown') }}
  </button>
</template>