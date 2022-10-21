<script lang="ts" setup>
import { Page, Site } from '@11thdeg/skaldstore'
import { addDoc, collection, doc, DocumentData, getFirestore, updateDoc } from '@firebase/firestore'
import { marked } from 'marked'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { usePage } from '../../composables/usePage'
import { useSession } from '../../composables/useSession'
import { useSite } from '../../composables/useSite'
import { useSnack } from '../../composables/useSnack'
import { logDebug } from '../../utils/logHelpers'

const { t } = useI18n()
const { uid } = useSession()
const { pushSnack } = useSnack()
const { chapters } = useSite()
const { key: sitekey, loading: siteLoading } = useSite()
const { page, loading: pageLoading } = usePage()

const router = useRouter()
const preview = ref(false)

const loading = computed(() => siteLoading.value || pageLoading.value)

const chapterOptions = computed(() => {
  return [
    { label: '-', value: '-' },
    ...chapters.value.map(c => ({
      label: c.name,
      value: c.slug
    }))]
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
  return newPageDoc.id
}

async function savePage () {
  logDebug('savePage', page.value)

  const p = page.value
  const u = uid.value

  // Fix data after update
  if (!p.hasOwner(u)) p.addOwner(u)
  if (_name.value) p.name = _name.value

  // Add htmlContent for backwards compatibility
  p.htmlContent = marked(p.markdownContent)
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

  pushSnack(t('page.saved'))
  router.push('/sites/' + sitekey + '/pages/' + routekey)
}

// Form fields

const _name = ref('')
const name = computed({
  get: () => _name.value || page.value.name,
  set: (v) => {
    _name.value = v
    page.value.name = v
  }
})
const nameError = computed(() => {
  return _name.value && 
    ( _name.value.length < 3 || name.value.length > 20 )
})


const hasUpdates = computed(() => {
  return true && _name.value
})

</script>

<template>
  <div class="Column double">
    <template v-if="loading">
      <cyan-loader large />
    </template>
    <template v-else>
      {{ hasUpdates }}
      <cyan-textfield
        :label="t('fields.page.name')"
        :value="name"
        :error="nameError"
        @change="name = $event.detail"
      />
      <cyan-markdown-area
        :label="t('fields.page.content')"
        :value="page.markdownContent"
        @change="page.markdownContent = $event.detail"
      />
      <cyan-toolbar>
        <cyan-select
          :options="chapterOptions"
          :value="page.category"
          @change="page.category = $event.target.value"
        />
        <cyan-spacer />
        <cyan-button
          :label="t('action.preview')"
          text
          noun="eye"
          @click="preview = true"
        />
        <cyan-button
          :label="t('action.save')"
          noun="send"
          @click="savePage"
        />
      </cyan-toolbar>
    </template>
  </div>
</template>