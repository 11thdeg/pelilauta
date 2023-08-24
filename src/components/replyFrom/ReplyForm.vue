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
import QuotedResponseSection from '../discussion/QuotedResponseSection.vue'
import InsertAssetButton from '../InsertAssetButton/InsertAssetButton.vue'
import { useAssets } from '../../composables/useAssets'


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
    pushSnack('snacks.reply.created')
    onCancel()
  } catch (e) {
    pushSnack('snacks.reply.error')
    logError(e)
  }
}

const { fetchAsset } = useAssets()

async function addImage (assetKey: string) {
  const asset = await fetchAsset(assetKey)
  if (!asset || !asset.url) {
    logError('addImage', assetKey, asset)
    return
  }
  if (!reply.value.images) {
    reply.value.images = []
  }
  reply.value.images?.push(asset.url)
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
  <cyan-card
    v-else
    id="ReplyToThreadSection"
    elevation="0"
    style="margin-top: var(--cn-page-grid); padding-top: 12px;"
  >
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
      <InsertAssetButton @insert="addImage" />
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
  </cyan-card>
</template>