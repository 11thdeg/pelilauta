<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSnack } from '../../composables/useSnack'

const { t } = useI18n()
const { pushSnack } = useSnack()

function copyUrl ():void {
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
    {{ t('action.share') }}
  </button>
</template>