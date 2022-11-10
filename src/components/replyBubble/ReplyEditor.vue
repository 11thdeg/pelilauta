<script lang="ts" setup>
import { Reply, Thread } from '@11thdeg/skaldstore'
import { doc, DocumentData, getFirestore, updateDoc } from '@firebase/firestore'
import { useI18n } from 'vue-i18n'
import { useFormField } from '../../composables/useFormField'
import { useSnack } from '../../composables/useSnack'
import { logDebug } from '../../utils/logHelpers'
import QuotedResponseSection from '../discussion/QuotedResponseSection.vue'

const props = defineProps<{
  threadkey: string,
  reply: {
    key?: string,
    images?: string[],
    quoteRef?: string,
    markdownContent: string,
    htmlContent: string
  } 
}>()
const emit = defineEmits<{
  (e: 'closeEditor'): void
}>()

const { t } = useI18n()
const { pushSnack } = useSnack()

const content = useFormField(props.reply.markdownContent)
const quoteRef = useFormField(props.reply.quoteRef || '')

async function save () {
  const update:DocumentData = {}
  if (content.dirty.value) update.markdownContent = content.computed.value
  if (quoteRef.dirty.value) update.quoteRef = quoteRef.computed.value
  logDebug('ReplyEditor', 'save', update)
  await updateDoc(
    doc(
      getFirestore(),
      Thread.collectionName,
      props.threadkey,
      Reply.collectionName,
      props.reply.key || ''),
    update
  )
  pushSnack('replyBubble.snack.saved')
  emit('closeEditor')
}
</script>
<template>
  <div class="ReplyEditor">
    <div
      v-if="quoteRef.computed.value"
      class="quotedContent"
    >
      <cyan-button
        class="deleteQuote"
        noun="trashcan"
        @click="quoteRef.computed.value = ''"
      />
      <QuotedResponseSection
        :threadkey="props.threadkey"
        :replykey="quoteRef.computed.value + ''"
      />
    </div>
    <cyan-textarea
      collapse
      :value="content.computed.value"
      @input="content.computed.value = $event.target.value"
    />
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        text
        small
        :label="t('action.cancel')"
        @click="emit('closeEditor')"
      />
      <cyan-button
        text
        small
        noun="send"
        :label="t('action.send')"
        @click="save"
      />
    </cyan-toolbar>
  </div>
</template>

<style lang="sass" scoped>
.quotedContent
  position: relative
  .deleteQuote
    position: absolute
    top: 4px
    right: 8px
    z-index: 1
</style>