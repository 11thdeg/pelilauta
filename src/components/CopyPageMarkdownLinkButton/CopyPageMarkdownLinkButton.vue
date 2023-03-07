<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScreenSize } from '../../composables/useScreenSize'
import { useSnack } from '../../composables/useSnack'

const props = defineProps<{
  page: {
    name: string
  }
}>()

const { isSmall } = useScreenSize()
const { t } = useI18n()
const { pushSnack } = useSnack()

const label = computed(() => isSmall.value ? undefined : t('action.copy.markdown'))

function copyMarkdownLink() {
  const markdownLink = `[${props.page.name || document.title}](${window.location.href})`
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