<script lang="ts" setup>
import { TagInfo, Thread } from '@11thdeg/skaldstore'
import { addDoc, collection, doc, getFirestore, updateDoc } from '@firebase/firestore'
import { marked } from 'marked'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useFormField, useStringField } from '../../composables/useFormField'
import { useMeta } from '../../composables/useMeta'
import { useScreenSize } from '../../composables/useScreenSize'
import { useSession } from '../../composables/useSession'
import { useAssets } from '../../composables/useAssets'
import { useSnack } from '../../composables/useSnack'
import { fetchThread } from '../../composables/useThreads'
import { logError } from '../../utils/logHelpers'
import ImageListSection from '../content/ImageListSection.vue'
import MarkdownSection from '../content/MarkdownSection.vue'
import YoutubePreview from '../content/YoutubePreview.vue'
import InsertAssetButton from '../InsertAssetButton/InsertAssetButton.vue'
import ProfileLink from '../profileLink/ProfileLink.vue'
import TopicTag from '../threads/TopicTag.vue'
import SiteSelectionDialogButton from './SiteSelectionDialogButton.vue'
import { extractTags } from '../../utils/content/extractTags'
import { setStorable } from '../../utils/firestoreHelpers'

const props = defineProps<{
  thread: {
    key?: string
    title: string
    youtubeId?: string
    siteid?: string
    images?: string[]
    markdownContent?: string
    topicid?: string
    author: string
    hasOwner: (uid:string) => boolean
  }
}>()

const { t } = useI18n()
const { uid, admin } = useSession()
const { streams } = useMeta()
const router = useRouter()
const { pushSnack } = useSnack()
const { isSmall } = useScreenSize()

const topics = computed(() => streams.value.map(stream => { return { value: stream.slug, label: stream.name } }))
const mode = computed(() => {
  if (props.thread.key) {
    return 'edit'
  } else {
    return 'new'
  }
})

watch(props, (p) => {
  if(p.thread && p.thread.topicid) {
    topic.value = p.thread.topicid
  }
})

// eslint-disable-next-line vue/no-setup-props-destructure
const { computed: title, dirty: titleChanged } = useFormField(props.thread.title)
const titleValid = computed(() => titleChanged.value ? title.value.toString().length > -1 && title.value.toString().length < 72 : true)

// eslint-disable-next-line vue/no-setup-props-destructure
const { computed: youtubeId, dirty: youtubeIdChanged } = useFormField(props.thread.youtubeId || '')
const showVideoLink = ref(false)

function parseYoutubeId(input: string){
  const parsed = input.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  if(parsed[2] !== undefined) {
    return parsed[2].split(/[^0-9a-z_\-]/i)[0]
  }
  else {
    return parsed[0]
  }
}
// eslint-disable-next-line vue/no-setup-props-destructure
const { computed: images, dirty: imagesChanged } = useFormField(props.thread.images || [])
// showImagePane = computed(() => (images.value as string[]).length > 0)

function pushImage (image: string) {
  images.value = [...(images.value as string[]), image]
}
function popImage (image: string) {
  images.value = (images.value as string[]).filter(i => i !== image)
}

async function updateTags(th:Thread) {
  const tagInfo = new TagInfo(th.key)
  tagInfo.tags = th.tags
  tagInfo.entryPath = th.getFirestorePath()
  tagInfo.entryTitle = th.title
  await setStorable(tagInfo)
}

const { fetchAsset } = useAssets()
async function insertAsset(key: string) {
  const asset = await fetchAsset(key)
  if (asset && asset.url) {
    pushImage(asset.url)
  }
}
// eslint-disable-next-line vue/no-setup-props-destructure
const { computed: content, dirty: contentChanged } = useFormField(props.thread.markdownContent || '')
const contentValid = computed(() => contentChanged.value ? content.value.toString().length > -1  && content.value.toString().length < 100000: true)
// eslint-disable-next-line vue/no-setup-props-destructure
const { computed: topic, dirty: topicChanged } = useFormField(props.thread.topicid || 'Yleinen')
// eslint-disable-next-line vue/no-setup-props-destructure
const { computed: site, dirty: siteChanged } = useStringField(props.thread.siteid || '')

const enableSave = computed(() => {
  // we want to have at least 3 characters in the title
  if (title.value.toString().length < 3) return false
  // We want to have at least 3 characters in the content, or some images, or a youtube link
  if (content.value.toString().length < 3 &&
    (images.value as string[]).length <0 &&
    !youtubeId) return false

  // if no fields are dirty, we don't want to enable the save button
  if (titleChanged.value) return true
  if (contentChanged.value) return true
  if (imagesChanged.value) return true
  if (youtubeIdChanged.value) return true
  if (topicChanged.value) return true
  if (siteChanged.value) return true

  return false
})

async function persistChanges () {
  if (!enableSave.value) {
    logError('Tried to save thread without changes')
    return
  }
  mode.value === 'new' ? await createThread() : await updateThread()
}

async function createThread () {
  const thread = new Thread()

  thread.title = title.value.toString()
  thread.markdownContent = content.value.toString()
  thread.htmlContent = marked(content.value.toString())
  thread.topicid = topic.value.toString()

  if (youtubeId.value.toString().length > 0) {
    thread.youtubeId = youtubeId.value.toString()
  }
  if ((images.value as string[]).length > 0) {
    thread.images = images.value as string[]
  }
  if (site.value.toString().length > 0) {
    thread.siteid = site.value.toString()
  }

  thread.addOwner(uid.value)

  // Extract hashtags from the markdown content
  thread.tags = extractTags(thread.markdownContent)

  try {
    const threadDoc = await addDoc(
      collection(getFirestore(), Thread.collectionName), thread.docData)
    pushSnack(t('snacks.thread.created'))

    // Update tags
    await updateTags(thread)

    router.push('/threads/' + threadDoc.id)
  } catch (e: unknown){
    logError(e)
    pushSnack(t('snacks.thread.createFailsError'))
  }
}

async function updateThread () {
  if (!props.thread.key) {
    logError('Tried to update thread without key')
    return
  }
  const thread = await fetchThread(props.thread.key)
  if (!thread) {
    logError('Tried to update thread that does not exist')
    return
  }
  if (!(admin || thread.hasOwner(uid.value))) {
    logError('Tried to update thread that does not belong to user, this would fail at the server')
    return
  }

  if (titleChanged.value) thread.title = title.value.toString()
  if (contentChanged.value) thread.markdownContent = content.value.toString()
  if (imagesChanged.value) thread.images = images.value as string[]
  if (youtubeIdChanged.value) thread.youtubeId = youtubeId.value.toString()
  if (topicChanged.value) thread.topicid = topic.value.toString()
  if (siteChanged.value) thread.siteid = site.value.toString()

  // Extract hashtags from the markdown content
  thread.tags = extractTags(thread.markdownContent)

  try {
    await updateDoc(
      doc(getFirestore(), Thread.collectionName, thread.key as string),
      thread.docData
    )
    await updateTags(thread)
    pushSnack(t('snacks.thread.updated'))
    router.push('/threads/' + thread.key)
  } catch (e: unknown){
    logError(e)
    pushSnack('snacks.thread.updateFailsError')
  }
}


const preview = ref(false)

const author = computed(() => props.thread.author || uid.value)

const previewLabel = computed(() => {
  if (isSmall.value) return undefined
  return preview.value ? t('action.edit') : t('action.preview')
})

</script>

<template>
  <div class="auto wd-large column fieldset">
    <template v-if="!preview">
      <cyan-toolbar>
        <cyan-textfield
          style="flex-grow: 1"
          :value="title"
          :label="t('fields.thread.name')"
          :error="!titleValid"
          @change="title = $event.target.value"
        />
        <cyan-button
          text
          noun="youtube"
          :disabled="showVideoLink"
          @click="showVideoLink = true"
        />
        <InsertAssetButton @insert="insertAsset($event)" />
      </cyan-toolbar>

      <!-- Youtube video! -->
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOutLeft"
        :duration="330"
      >
        <cyan-toolbar v-if="showVideoLink || youtubeId">
          <cyan-icon noun="youtube" />
          <cyan-textfield
            style="flex-grow: 1"
            :value="youtubeId"
            :label="t('fields.thread.youtubeId')"
            @change="youtubeId = parseYoutubeId($event.target.value)"
          />
          <cyan-button
            text
            :label="t('action.remove')"
            @click="showVideoLink = false; youtubeId = ''"
          />
        </cyan-toolbar>
      </transition>

      <!-- Images! -->
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOutLeft"
        :duration="330"
      >
        <ImageListSection
          v-if="(images as string[]).length > 0"
          edit
          :images="(images as string[])"
          @remove-image="popImage($event)"
        />
      </transition>
      <cyan-markdown-area
        :value="content"
        :label="t('fields.thread.content')"
        :error="!contentValid"
        @change="content = $event.target.value"
      />
      <div class="flex flex-row sm-flex-column">
        <cyan-select
          :options="topics"
          :value="topic"
          :label="t('fields.thread.topic')"
          @change="topic = $event.target.value"
        />
        <SiteSelectionDialogButton v-model="site" />
        <cyan-spacer />
        <cyan-button
          :label="previewLabel"
          text
          noun="eye"
          @click="preview = true"
        />
        <cyan-button
          :label="t('action.send')"
          noun="send"
          :disabled="!enableSave"
          @click="persistChanges"
        />
      </div>
    </template>
    <template v-else>
      <h1>{{ title }}</h1>
      <p class="typeCaption">
        <ProfileLink :uid="author" />
        <TopicTag :slug="topic.toString()" />
      </p>
      <YoutubePreview
        v-if="youtubeId"
        :video-id="youtubeId.toString()"
      />
      <ImageListSection
        v-if="(images as string[]).length > 0"
        :images="(images as string[])"
        @remove-image="popImage($event)"
      />
      <MarkdownSection :content="content.toString()" />
      <cyan-toolbar>
        <cyan-spacer />
        <cyan-button
          noun="edit"
          :label="t('action.edit')"
          text
          @click="preview = false"
        />
        <cyan-button
          :label="t('action.send')"
          noun="send"
          :disabled="!enableSave"
          @click="persistChanges"
        />
      </cyan-toolbar>
    </template>
  </div>
  <!--article
    v-if="admin"
  >
    <cyan-card
      elevation="1"
      class="debug chroma-box-b"
    >
      <cyan-icon
        large
        noun="admin"
        style="display:block; margin: 0 auto"
      />
      <p>{{ mode }}</p>
      <p :class="{ dirty: titleChanged }">
        title: <cyan-code>{{ title }}</cyan-code>
      </p>
      <p :class="{ dirty: youtubeIdChanged }">
        youtubeId: <cyan-code>{{ youtubeId ? youtubeId : 'undefined' }}</cyan-code>
      </p>
      <p :class="{ dirty: imagesChanged }">
        images: <cyan-code> {{ (images as []).length }}</cyan-code>
      </p>
      <p :class="{ dirty: contentChanged }">
        content: <cyan-code>{{ content.toString().substring(0,10) }}</cyan-code>
      </p>
      <p :class="{ dirty: topicChanged }">
        topic: <cyan-code>{{ topic }}</cyan-code>
      </p>
    </cyan-card>
  </article- ->
  <!- -Teleport to=".AppLayout">
    <cn-side-sheet>
      <h4>...</h4>
    </cn-side-sheet>
  </Teleport-->
</template>

<style lang="sass">
.debug
  .dirty
    text-decoration: underline
</style>