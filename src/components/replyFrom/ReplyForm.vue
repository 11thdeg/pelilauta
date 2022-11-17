<script lang="ts" setup>
import { Reply, Thread } from '@11thdeg/skaldstore'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { logDebug, logError } from '../../utils/logHelpers'
import { collection, getFirestore, addDoc, updateDoc, doc, serverTimestamp, increment } from '@firebase/firestore'
import { useSnack } from '../../composables/useSnack'
import { useSession } from '../../composables/useSession'
import { marked } from 'marked'
import ImageListSection from '../content/ImageListSection.vue'
import SelectAssetDialog from '../assets/SelectAssetDialog.vue'
import QuotedResponseSection from '../discussion/QuotedResponseSection.vue'
import { useSubscriber } from '../../composables/useSession/useSubscriber'


const { t } = useI18n()
const { pushSnack } = useSnack()
const { account } = useSession()
const { anonymous, active } = useSession()

const reply = ref(new Reply())

const props = defineProps<{
  threadkey: string,
  quote?: string[]
}>()

function onCancel () {
  reply.value = new Reply()
  replace.value = ''
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
    const { subscribeTo } = useSubscriber()
    await addDoc(
      collection(
        getFirestore(),
        Thread.collectionName,
        props.threadkey,
        Reply.collectionName
      ),
      data
    )
    logDebug('updating thread fields by the client, this should be moved to cloud-side for cIA purposes')
    await updateDoc(
      doc(
        getFirestore(),
        Thread.collectionName,
        props.threadkey
      ),
      {
        flowTime: serverTimestamp(),
        replyCount: increment(1)
      }
    )
    subscribeTo(props.threadkey)
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
  <cyan-loader v-if="!active" />
  <section v-else-if="anonymous">
    <p
      class="TypeBody2 lowEmphasis"
      style="text-align: center;"
    >
      {{ t('discourse.loginToJoinDiscourse') }}
    </p>
  
    <cyan-toolbar>
      <cyan-spacer />
      <router-link to="/login">
        <cyan-button
          noun="logout"
          :label="t('action.login')"
        />
      </router-link>
      <cyan-spacer />
    </cyan-toolbar>
    <cyan-icon
      noun="fox"
      xlarge
      style="display: block; margin: 12px auto; opacity: 0.22"
    />
  </section>
  <section
    v-else
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