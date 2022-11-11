<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { addDoc, collection, getFirestore } from '@firebase/firestore'
import { marked } from 'marked'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useMeta } from '../../../composables/useMeta'
import { useSession } from '../../../composables/useSession'
import { useSnack } from '../../../composables/useSnack'
import { logError } from '../../../utils/logHelpers'
import InsertImageButton from '../../actions/InsertImageButton.vue'
import MarkdownSection from '../../content/MarkdownSection.vue'
import YoutubePreview from '../../content/YoutubePreview.vue'

const { t } = useI18n()
const router = useRouter()
const { streams, frozen } = useMeta()
const { pushSnack } = useSnack()
const { uid, anonymous } = useSession()

const topics = computed(() => streams.value.map(stream => { return { value: stream.slug, label: stream.name } }))
const chosenTopic = computed(() => 'Yleinen')

const videolink = ref(false)
const preview = ref(false)

const thread = ref(new Thread())


const valid = computed(() => {
  return titleValid.value &&
    (title.value.length > 0 || content.value.length > 0) &&
    contentValid.value
})

// Title
const _title = ref('')
const title = computed({
  get: () => _title.value || thread.value.title,
  set: (value: string) => {
    _title.value = value
  }
})
const titleValid = computed(() => {
  if (_title.value) {
    if (_title.value.length > 72) {
      return false
    }
  }
  return true
})

// Content
const _content = ref('')
const content = computed({
  get: () => _content.value || thread.value.markdownContent,
  set: (value: string) => {
    _content.value = value
  }
})
const contentValid = computed(() => {
  if (_content.value) {
    if (_content.value.length > 1024 * 720) {
      return false // Firebase entity size limit is 1MB, this leaves some space for other fields
    }
  }
  return true
})

async function send() {
  if (!valid.value) {
    logError('Thread is not valid, can not save')
    return
  }
  if (anonymous.value) {
    pushSnack(t('error.anonymous'))
    logError('Anonymous user tried to send a thread')
    return
  }
  if (frozen.value.includes(uid.value)) {
    pushSnack(t('error.frozen'))
    logError('User tried to send a thread while frozen')
    return
  }
  if (!thread.value.topicid) thread.value.topicid = chosenTopic.value

  // Prep data
  thread.value.author = uid.value
  if (_title.value) thread.value.title = _title.value
  if (_content.value) {
    thread.value.markdownContent = _content.value
    thread.value.htmlContent = marked(_content.value)
  }
  
  const doc = await addDoc(
    collection(
      getFirestore(),
      Thread.collectionName,
    ),
    thread.value.docData
  )
  pushSnack(t('snack.thread.added'))
  router.push('/threads/' + doc.id)
}

const injected = ref('')
</script>

<template>
  <div class="Column form double">
    <cyan-code>{{ titleValid }}</cyan-code>
    <template v-if="!preview">
      <cyan-toolbar>
        <div style="flex-grow: 1">
          <cyan-textfield
            :value="title"
            :label="t('fields.thread.name')"
            :error="!titleValid"
            @change="title = $event.target.value"
          />
        </div>
        <cyan-button
          text
          noun="youtube"
          :disabled="videolink"
          @click="videolink = true"
        />
        <InsertImageButton @insert="injected = `![${$event}](${$event})`" />
      </cyan-toolbar>
      <cyan-toolbar v-if="videolink || thread.youtubeId">
        <cyan-icon noun="youtube" />
        <div style="flex-grow: 1">
          <cyan-textfield
            :label="t('fields.thread.youtubeId')"
            @change="thread.youtubeId = $event.target.value"
          />
        </div>
        <cyan-button
          text
          :label="t('action.remove')"
          @click="videolink = false; thread.youtubeId = ''"
        />
      </cyan-toolbar>
      <cyan-markdown-area
        :value="content"
        :inject="injected"
        :label="t('fields.thread.content')"
        @change="content = $event.target.value"
      />
      <cyan-toolbar>
        <cyan-select
          :options="topics"
          :value="chosenTopic"
          :label="t('fields.thread.topic')"
          @change="thread.topicid = $event.target.value"
        />
        <cyan-spacer />
        <cyan-button
          :label="t('action.preview')"
          text
          noun="eye"
          @click="preview = true"
        />
        <cyan-button
          :label="t('action.send')"
          noun="send"
          :disabled="!valid"
          @click="send"
        />
      </cyan-toolbar>
    </template>
    <template v-else>
      <h1>{{ thread.title }}</h1>
      <YoutubePreview
        v-if="thread.youtubeId"
        :video-id="thread.youtubeId"
      />
      <p class="typeCaption">
        {{ thread.author }}, {{ thread.topicid }}
      </p>
      <MarkdownSection :content="content" />
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
          :disabled="!valid"
          @click="send"
        />
      </cyan-toolbar>
    </template>
  </div>
</template>