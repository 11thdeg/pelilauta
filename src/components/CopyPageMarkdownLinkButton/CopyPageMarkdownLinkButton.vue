<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePage } from '../../composables/usePage'
import { useScreenSize } from '../../composables/useScreenSize'
import { useSnack } from '../../composables/useSnack'

const { isSmall } = useScreenSize()
const { t } = useI18n()
const { page } = usePage()
const { pushSnack } = useSnack()

const label = computed(() => isSmall.value ? undefined : t('action.copy.markdown'))


function copyMarkdownLink() {
  const markdownLink = `[${page.value?.name || document.title}](${window.location.href})`
  navigator.clipboard.writeText(markdownLink)
  pushSnack('snacks.markdownCopiedToClipboard')
}
</script>

<template>
  <cyan-button
    :label="label"
    noun="copy"
    text
    @click.prevent="copyMarkdownLink"
  />
</template>