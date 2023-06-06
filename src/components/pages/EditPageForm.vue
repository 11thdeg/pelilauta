<script lang="ts" setup>
import { Page, TagInfo } from '@11thdeg/skaldstore'
import Europa from 'europa'
import { marked } from 'marked'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAssets } from '../../composables/useAssets'
import { fetchPage } from '../../composables/usePages'
import { useSession } from '../../composables/useSession'
import { useSite } from '../../composables/useSite'
import { useSnack } from '../../composables/useSnack'
import { parseAssetName } from '../../utils/assetHelpers'
import { logDebug } from '../../utils/logHelpers'
import MarkdownSection from '../content/MarkdownSection.vue'
import InsertAssetButton from '../InsertAssetButton/InsertAssetButton.vue'
import WithLoader from '../ui/WithLoader.vue'
import { extractTags } from '../../utils/content/extractTags'
import { addStorable, setStorable, updateStorable } from '../../utils/firestoreHelpers'

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
const { site } = useSite()

const router = useRouter()
const preview = ref(false)

onMounted(async() => {
  if (props.pagekey) {
    page.value = await fetchPage(sitekey.value, props.pagekey) || new Page()
  }
  loading.value = false
})

async function updateTags() {
  const tags = extractTags(markdown.value)
  const tagInfo = new TagInfo(page.value.key)
  tagInfo.tags = tags
  tagInfo.entryPath = page.value.getFirestorePath()
  tagInfo.entryTitle = site.value?.name + ' / ' + page.value.name
  await setStorable(tagInfo)
}

async function savePage () {
  logDebug('savePage', page.value)

  const p = page.value
  const u = uid.value

  // Save revision, if any
  if (p.updatedAt) {
    if (!p.markdownContent) {
      logDebug('converting html to markdown, legacy page')
      const e = new Europa()
      p.markdownContent = e.toMarkdown(p.htmlContent)
    }
    p.saveRevision()
  }

  // Fix data after update
  if (!p.hasOwner(u)) p.addOwner(u)
  if (_name.value) p.name = _name.value
  if (_chapter.value) p.category = _chapter.value
  else if (!p.category) p.category = '-' // forcing a default category to db, not really necessary as missing category is  catched by error handling in the app

  // Add htmlContent for backwards compatibility
  p.htmlContent = marked(markdown.value)
  p.markdownContent = markdown.value

  // Extract hashtags from the markdown content
  p.tags = extractTags(p.markdownContent)

  let routekey = sitekey.value

  if (!p.key) {
    // We are creating a new page, as the page does not have a db identifier
    logDebug('EditPageForm.vue', 'Vreating a new page')
    routekey = await addStorable(p)
    if (props.homepage && site.value) {
      await updateStorable(
        site.value.getFirestorePath(),
        { homepage: routekey }
      )
    }
  } else {
    // We are updating an existing page
    logDebug('updating an existing page', p.key)
    await updateStorable(p)
    routekey = p.key
  }

  // Update tags
  await updateTags()

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
  get: () => _chapter.value || page.value.category,
  set: (v) => {
    _chapter.value = v
    page.value.category = v
  }
})

// Markdown
const _markdown = ref('')
const markdown = computed({
  get: () => _markdown.value || page.value.markdownContent,
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

const hasUpdates = computed(() => {
  if (
    _name.value ||
    _chapter.value ||
    _markdown.value
  ) return true
  return false
})

const { fetchAsset } = useAssets()
const inject = ref('')

async function injectImage (key: string) {
  const asset = await fetchAsset(key)
  if (asset && asset.url) {
    inject.value = '!['+ parseAssetName(asset)+ '](' + asset.url + ')'
  }
}

</script>

<template>
  <form class="Column large">
    <WithLoader :suspended="loading">
      <section
        v-if="!preview"
        class="fieldset"
      >
        <cyan-toolbar>
          <cyan-textfield
            class="flex-grow"
            :label="t('fields.page.name')"
            :value="name"
            :error="nameError"
            @change="name = $event.target.value"
          />
          <InsertAssetButton
            @insert="injectImage($event)"
          />
        </cyan-toolbar>
        <cyan-markdown-area
          :label="t('fields.page.content')"
          :value="markdown"
          :error="markdownError"
          :inject="inject"
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
    </WithLoader>
  </form>
</template>