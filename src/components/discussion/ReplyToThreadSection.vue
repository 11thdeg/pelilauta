<script lang="ts" setup>
import { Reply } from '@11thdeg/skaldstore'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { logDebug, logError } from '../../utils/loghelpers'
import { collection, getFirestore, addDoc, updateDoc, doc, serverTimestamp, increment } from '@firebase/firestore'
import { useSnack } from '../../composables/useSnack'
import { useSession } from '../../composables/useSession'
import { marked } from 'marked'
import ImageListSection from '../content/ImageListSection.vue'
import SelectAssetDialog from '../assets/SelectAssetDialog.vue'
import QuotedResponseSection from './QuotedResponseSection.vue'


const { t } = useI18n()
const { pushSnack } = useSnack()
const { account } = useSession()

const reply = ref(new Reply())

const props = defineProps<{
  threadkey: string,
  quote?: string[]
}>()

function onCancel () {
  reply.value = new Reply()
  replace.value = '&nbsp;'
}

onMounted(() => {
  watch(props, (p) => {
    logDebug('props change', p)
    if (p.quote && Array.isArray(p.quote) && p.quote?.length === 2) {
      reply.value.quoteRef = p.quote[1]
    }
  })
})

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

const addImageDialog = ref(false)
function addImage (url: string) {
  if (!reply.value.images) {
    reply.value.images = []
  }
  reply.value.images?.push(url)
}

const replace=ref('')

</script>

<template>
  <section
    id="ReplyToThreadSection"
    class="card rise-a"
    style="margin-top: 12px"
  >
    <SelectAssetDialog
      v-model="addImageDialog"
      @select="addImage($event)"
    />
    <ImageListSection
      v-if="reply.images"
      :images="reply.images"
    />
    <QuotedResponseSection
      v-if="reply.quoteRef"
      :threadkey="threadkey"
      :replykey="reply.quoteRef"
    />
    <cyan-textarea
      :placeholder="t('reply.placeholder')"
      :label="t('reply.title')"
      collapse
      :value="replace"
      style="margin-bottom: 12px"
      @change="reply.markdownContent = $event.target.value"
    />
    <cyan-toolbar>
      <cyan-button
        :label="t('action.addImage')"
        text
        noun="add"
        @click="addImageDialog = true"
      />
      <cyan-spacer />
      <cyan-button
        text
        :label="t('action.cancel')"
        @click.prevent="onCancel"
      />
      <cyan-button
        :label="t('action.send')"
        noun="send"
        @click.prevent="onSubmit"
      />
    </cyan-toolbar>
  </section>
</template>