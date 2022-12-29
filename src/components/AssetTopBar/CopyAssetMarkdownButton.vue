<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useAsset } from '../../composables/useAsset'
import { useSnack } from '../../composables/useSnack'
import { parseAssetName } from '../../utils/parseAssetName'

const { t } = useI18n()
const { pushSnack } = useSnack()

const { asset } = useAsset()

function copyMarkdown () {
  navigator.clipboard.writeText(`![${parseAssetName(asset.value) || 'An unnamed image from the library'}](${asset.value.url})`)
  pushSnack(t('snacks.markdownCopiedToClipboard'))
}
</script>

<template>
  <cyan-button
    text
    noun="copy"
    :label="t('action.copy.markdown')"
    @click="copyMarkdown"
  />
</template>