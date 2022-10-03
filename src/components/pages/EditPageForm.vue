<script lang="ts" setup>
import { Page } from '@11thdeg/skaldstore'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { usePages } from '../../composables/usePages'
import { logDebug } from '../../utils/logHelpers'

const props = defineProps<{
  sitekey: string
  pagekey?: string
}>()

const { t } = useI18n()
const { pages } = usePages(props.sitekey)
const router = useRouter()

const newPage = computed(() => !props.pagekey)
const page = ref(new Page())
const preview = ref(false)

onMounted(async () => {
  page.value = newPage.value ? new Page() : pages.value.find(p => p.key === props.pagekey) || new Page()
})

function savePage () {
  logDebug('savePage', page.value)
}
function cancel () {
  page.value = new Page()
  router.back()
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
      <cyan-select />
      <cyan-spacer />
      <cyan-button
        :label="t('action.cancel')"
        text
        @click="cancel"
      />
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