<script lang="ts" setup>
import { Reply } from '@11thdeg/skaldstore'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { logDebug, logError } from '../../utils/loghelpers'
import { collection, getFirestore, addDoc, updateDoc, doc, serverTimestamp, increment } from '@firebase/firestore'
import { useSnack } from '../../composables/useSnack'
import { useSession } from '../../composables/useSession'
import { marked } from 'marked'

const { t } = useI18n()
const { pushSnack } = useSnack()
const { account } = useSession()

const reply = ref(new Reply())

const props = defineProps<{
  threadkey: string
}>()

function onCancel () {
  reply.value = new Reply()
}

async function onSubmit () {
  reply.value.author = account.value.uid
  reply.value.htmlContent = marked(reply.value.markdownContent)
  const data = reply.value.docData
  data.created = data.createdAt // TODO: remove this after migration
  logDebug('onSubmit', data)
  try {
    await addDoc(
      collection(
        getFirestore(),
        'stream',
        props.threadkey,
        'comments'
      ),
      data
    )
    logDebug('updating thread fields by the client, this should be moved to cloud-side for cIA purposes')
    await updateDoc(
      doc(
        getFirestore(),
        'stream',
        props.threadkey
      ),
      {
        flowTime: serverTimestamp(),
        replyCount: increment(1)
      }
    )
    pushSnack('snacks.reply.success')
    onCancel()
  } catch (e) {
    pushSnack('snacks.reply.error')
    logError(e)
  }
}

logDebug('ThreadDiscussionColumn.vue: threadid=', props.threadkey)

</script>

<template>
  <section>
    <cyan-textarea
      :placeholder="t('reply.placeholder')"
      :label="t('reply.title')"
      collapse
      :value="reply.markdownContent"
      @change="reply.markdownContent = $event.target.value"
    />
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        text
        :label="t('action.cancel')"
        @click.prevent="onCancel"
      />
      <cyan-button
        :label="t('action.send')"
        @click.prevent="onSubmit"
      />
    </cyan-toolbar>
  </section>
</template>