<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSnack } from '../../composables/useSnack'

const { t } = useI18n()
const { pushSnack } = useSnack()

function copyUrl ():void {
  navigator.clipboard.writeText(window.location.href)
  pushSnack(t('messages.copiedToClipboard'))
}
</script>
    
<template>
  <cyan-button
    text
    noun="share"
    :label="t('action.share')"
    @click.prevent="copyUrl"
  />
</template>