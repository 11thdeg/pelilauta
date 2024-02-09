<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSnack } from '../../composables/useSnack'

const { t } = useI18n()
const { pushSnack } = useSnack()

async function copyUrl () {
  // Check if the Web Share API is supported by the browser, if so, use it
  if (typeof navigator.share !== 'undefined') {
    await navigator.share({
      title: document.title,
      url: window.location.href,
    })
    return
  }
  navigator.clipboard.writeText(window.location.href)
  pushSnack(t('snacks.linkCopiedToClipboard'))
}
</script>
    
<template>
  <button
    class="text"
    @click.prevent="copyUrl"
  >
    <cyan-icon
      noun="share"
      small
    />
    <span class="sm-display-none">{{ t('action.share') }}</span>
  </button>
</template>