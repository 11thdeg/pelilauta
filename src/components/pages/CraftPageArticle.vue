<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePages } from '../../composables/usePages'
import { Page } from '@11thdeg/skaldstore'
import { addStorable } from '../../utils/firestoreHelpers'
import { logError } from '../../utils/logHelpers'
import { useSnack } from '../../composables/useSnack'
import { useSite } from '../../composables/useSite'
import { useRouter } from 'vue-router'
import { useSession } from '../../composables/useSession'
import { toMekanismiURI } from '../../utils/toMekanismiURI'

const { t } = useI18n()
const title = ref('')
const { hasPage } = usePages()
const { pushSnack } = useSnack()
const { key:siteKey } = useSite()
const router = useRouter()
const { uid } = useSession()

async function addPage() {
  console.log('addPage')

  if (!validName.value) throw new Error('Invalid page name, cannot add')

  const page = new Page()
  page.name = title.value
  page.parentKey = siteKey.value
  page.addOwner(uid.value)

  //Normalize key to human-readable form
  const key = toMekanismiURI(title.value)

  try {
    await addStorable(page, { key })
    pushSnack('snacks.page.crafted')
    router.push(`/sites/${siteKey.value}/pages/${key}/edit`)
  } catch (error) {
    logError(error)
    pushSnack('snacks.page.craftFailed')
  }
}

const duplicateName = computed(() => {
  return hasPage(title.value)
})

const validName = computed(() => {
  if (duplicateName.value) return false
  return title.value.length > 0
})

const url = computed(() => {
  // const windowDomain = window.location.hostname
  // const windowProtocol = window.location.protocol
  // const windowPort = window.location.port ? ':' + window.location.port : ''
  // const composite =  `${windowProtocol}//${windowDomain}${windowPort}
  const composite = `/sites/${siteKey.value}/pages/`
  return composite + toMekanismiURI(title.value)
})

</script>
<template>
  <article class="column auto wd-large">
    <form>
      <fieldset>
        <legend>{{ t('page.craft.title') }}</legend>
        <input
          v-model="title"
          type="text" 
          placeholder="Page Title"
          maxlength="72"
          :class="{invalid: duplicateName}"
        >
        <p class="TypeCaption">
          {{ t('page.craft.url') }}: {{ url }}
        </p>
        <p v-if="duplicateName">
          {{ t('page.craft.duplicateWarning') }}
        </p>
        <div class="flex justify-right">
          <button
            class="text"
            @click.prevent="$router.back()"
          >
            {{ t('action.cancel') }}
          </button>
          <button
            :disabled="!validName"
            @click.prevent="addPage"
          >
            {{ t('action.add.page') }}
          </button>
        </div>
      </fieldset>
    </form>
  </article>
</template>