<script lang="ts" setup>
import { Page, Site } from '@11thdeg/skaldstore'
import { addDoc, collection, doc, DocumentData, getFirestore, updateDoc } from '@firebase/firestore'
import { marked } from 'marked'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { fetchPage } from '../../composables/usePages'
import { useSession } from '../../composables/useSession'
import { useSite } from '../../composables/useSite'
import { useSnack } from '../../composables/useSnack'
import { logDebug } from '../../utils/logHelpers'
import MarkdownSection from '../content/MarkdownSection.vue'

const props = defineProps<{
  homepage?: boolean;
  pagekey?: string;
}>()

const { t } = useI18n()
const { uid } = useSession()
const { pushSnack } = useSnack()
const { key: sitekey, chapterOptions} = useSite()
const page = ref(new Page())
const loading = ref(true)

const router = useRouter()
const preview = ref(false)

onMounted(async() => {
  if (props.pagekey) {
    page.value = await fetchPage(sitekey.value, props.pagekey) || new Page()
  }
  loading.value = false
})

async function update (data:DocumentData, key: string) {
  if (!key) throw new Error('A Page key is required for update')
  return await updateDoc(
    doc(
      getFirestore(),
      Site.collectionName,
      sitekey.value,
      Page.collectionName,
      key
    ),
    data
  )
}

async function add (data:DocumentData) {
  const newPageDoc = await addDoc(
    collection(
      getFirestore(),
      Site.collectionName,
      sitekey.value,
      Page.collectionName
    ),
    data
  )
  if (props.homepage) {
    await updateDoc(
      doc(
        getFirestore(),
        Site.collectionName,
        sitekey.value
      ),
      { homepage: newPageDoc.id }
    )
  }
  return newPageDoc.id
}

async function savePage () {
  logDebug('savePage', page.value)

  const p = page.value
  const u = uid.value

  // Fix data after update
  if (!p.hasOwner(u)) p.addOwner(u)
  if (_name.value) p.name = _name.value
  if (_chapter.value) p.category = _chapter.value
  else if (!p.category) p.category = '-' // forcing a default category to db, not really necessary as missing category is  catched by error handling in the app

  // Add htmlContent for backwards compatibility
  p.htmlContent = marked(markdown.value)
  p.markdownContent = markdown.value
  logDebug('markdown', p.markdownContent)

  let routekey = sitekey.value

  if (!p.key) {
    // We are creating a new page, as the page does not have a db identifier
    logDebug('creating a new page')
    routekey = await add(p.docData)
  } else {
    // We are updating an existing page
    logDebug('updating an existing page', p.key)
    await update(p.docData, p.key)
    routekey = p.key
  }

  pushSnack(t('snacks.page.updated'))
  router.push('/sites/' + sitekey.value + '/pages/' + routekey)
}

// *** Form fields *******************************************************


// Name
const _name = ref('')
const name = computed({
  get: () => _name.value || page.value.name,
  set: (v) => {
    _name.value = v
    page.value.name = v
  }
})
const nameError = computed(() => {
  if (_name.value) {
    if (_name.value.length > 48) return t('fields.error.tooLong')
  }
  return false
})

// Chapter
const _chapter = ref('')
const chapter = computed({
  get: () => _chapter.value || page.value.category,
  set: (v) => {
    _chapter.value = v
    page.value.category = v
  }
})

// Markdown
const _markdown = ref('')
const markdown = computed({
  get: () => _markdown.value || page.value.markdownContent,
  set: (v) => {
    _markdown.value = v
    page.value.markdownContent = v
  }
})
const markdownError = computed(() => {
  if (_markdown.value) {
    if (_markdown.value.length > 1024 * 800) return t('fields.error.tooLong') // 1MB, max size for firestore, some space left for metadata
  }
  return false
})
/* const htmlConversionAvailable = computed(() => {
  return page.value.htmlContent && !page.value.markdownContent
}) */

const hasUpdates = computed(() => {
  if (
    _name.value ||
    _chapter.value ||
    _markdown.value
  ) return true
  return false
})

</script>

<template>
  <div class="Column large">
    <template v-if="loading">
      <cyan-loader large />
    </template>
    <template v-else>
      <!-- <cyan-code>{{ props.homepage }}</cyan-code>
      <cyan-code>({{ htmlConversionAvailable }})</cyan-code>&nbsp;
      <cyan-code>({{ hasUpdates }})</cyan-code>&nbsp;
      <cyan-code>({{ _chapter }})</cyan-code>&nbsp;
      <cyan-code>({{ markdownError }})</cyan-code-->
      <section
        v-if="!preview"
        style="display:flex; flex-direction: column; gap: var(--cyan-column-gap)"
      >
        <cyan-textfield
          :label="t('fields.page.name')"
          :value="name"
          :error="nameError"
          @change="name = $event.target.value"
        />
        <cyan-markdown-area
          :label="t('fields.page.content')"
          :value="markdown"
          :error="markdownError"
          @change="markdown = $event.target.value"
        />
      </section>

      <section v-else>
        <h4>{{ name }} <cyan-tag :label="chapter" /></h4>
        <hr>
        <MarkdownSection :content="markdown" />
        <hr>
      </section>

      <cyan-toolbar>
        <cyan-select
          v-if="chapterOptions.length > 1"
          :options="chapterOptions"
          :value="chapter"
          @change="chapter = $event.target.value"
        />
        <cyan-spacer />
        <cyan-button
          v-if="!preview"
          :label="t('action.preview')"
          text
          noun="eye-open"
          @click="preview = true"
        />
        <cyan-button
          v-if="preview"
          :label="t('action.edit')"
          text
          noun="eye-closed"
          @click="preview = false"
        />
        <cyan-button
          :label="t('action.save')"
          noun="send"
          :disabled="!hasUpdates"
          @click="savePage"
        />
      </cyan-toolbar>
    </template>
  </div>
</template>