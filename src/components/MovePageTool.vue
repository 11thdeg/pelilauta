<script lang="ts" setup>
import { Page, Site } from '@11thdeg/skaldstore'
import { addDoc, collection, deleteDoc, doc, getFirestore } from '@firebase/firestore'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { usePage } from '../composables/usePage'
import { useSites } from '../composables/useSites'
import { useSnack } from '../composables/useSnack'
import { logDebug, logError } from '../utils/logHelpers'

const { t } = useI18n()
const { sitesAsOptions } = useSites()
const { page } = usePage()
const { pushSnack } = useSnack()
const router = useRouter()

const props = defineProps<{
  sitekey: string;
  pagekey: string;
}>()

const targetSite = ref('')

async function movePage() {
  if (!targetSite.value) {
    logError('No target site selected')
    return
  }
  try {
    const data = page.value?.docData
    const newDoc = await addDoc(
      collection(
        getFirestore(),
        Site.collectionName,
        targetSite.value,
        Page.collectionName
      ),
      data
    )
    logDebug('New page created', newDoc.id)
    logDebug('Deleting old page', props.pagekey, props.sitekey)
    await deleteDoc(
      doc(
        getFirestore(),
        Site.collectionName,
        props.sitekey,
        Page.collectionName,
        props.pagekey
      )
    )
    pushSnack(t('snacks.page.move.success'))
    router.push(`/sites/${targetSite.value}/pages/${newDoc.id}`)

  } catch (error) {
    logError(error)
    pushSnack(t('snacks.page.move.error'))
  }
}


</script>

<template>
  <div class="Column">
    <h3>{{ t('page.move.title') }}</h3>
    <h4 v-if="page">
      {{ page.name }}
    </h4>
    <p>{{ t('page.move.description') }}</p>
    <cyan-toolbar>
      <cyan-select
        :options="sitesAsOptions"
        :label="t('page.move.site')"
        @change="targetSite = $event.target.value"
      />
      <cyan-button
        :disabled="!targetSite"
        :label="t('action.move')"
        noun="page"
        text
        @click="movePage"
      />
    </cyan-toolbar>
    {{ targetSite }}
  </div>
</template>