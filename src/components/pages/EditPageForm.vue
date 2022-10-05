<script lang="ts" setup>
import { Page, Site } from '@11thdeg/skaldstore'
import { addDoc, collection, doc, DocumentData, getDoc, getFirestore, setDoc, updateDoc } from '@firebase/firestore'
import { marked } from 'marked'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { usePages } from '../../composables/usePages'
import { useSession } from '../../composables/useSession'
import { useSite } from '../../composables/useSite'
import { useSnack } from '../../composables/useSnack'
import { logDebug } from '../../utils/logHelpers'

const props = defineProps<{
  sitekey: string
  pagekey?: string
}>()

const { t } = useI18n()
const { pages } = usePages(props.sitekey)
const { uid } = useSession()
const { pushSnack } = useSnack()
const { chapters } = useSite(props.sitekey)
const router = useRouter()

const newPage = computed(() => !props.pagekey)
const page = ref(new Page())
const preview = ref(false)

onMounted(async () => {
  page.value = newPage.value ? new Page() : pages.value.find(p => p.key === props.pagekey) || new Page()
})

const chapterOptions = computed(() => {
  return [
    { label: '-', value: '-' },
    ...chapters.value.map(c => ({
      label: c.name,
      value: c.slug
    }))]
})

async function update (p:DocumentData) {
  if (!p.key && !props.pagekey) throw new Error('A Page key is required for update')
  return await updateDoc(
    doc(
      getFirestore(),
      Site.collectionName,
      props.sitekey,
      Page.collectionName,
      p.key || props.pagekey || ''
    ),
    p
  )
}

async function add (p:DocumentData) {
  if (p.key) throw new Error('A Page key is not allowed for add')
  if (props.pagekey) {
    const exists = await getDoc(
      doc(
        getFirestore(),
        Site.collectionName,
        props.sitekey,
        Page.collectionName,
        props.pagekey
      )
    )
    if (exists.exists()) throw new Error('Duplicate page key in DB')
    setDoc(
      doc(
        getFirestore(),
        Site.collectionName,
        props.sitekey,
        Page.collectionName,
        props.pagekey
      ),
      p
    )
    return props.pagekey
  } else {
    const newDoc = await addDoc(
      collection(
        getFirestore(),
        Site.collectionName,
        props.sitekey,
        Page.collectionName
      ),
      p
    )
    return newDoc.id
  }
}

async function savePage () {
  logDebug('savePage', page.value)
  page.value.addOwner(uid.value)
  page.value.htmlContent = marked(page.value.markdownContent)
  let key = ''
  if (page.value && page.value.key) {
    await update(page.value.docData)
    key = page.value.key
  } else {
    key = await add(page.value.docData)
  }
  pushSnack(t('page.saved'))
  router.push('/sites/' + props.sitekey + '/pages/' + key)
}
</script>

<template>
  <div class="Column double">
    <cyan-textfield
      :label="t('fields.page.name')"
      :value="page.name"
      @change="page.name = $event.detail"
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
    <div class="debug">
      {{ newPage }}
    </div>
  </div>
</template>