<script lang="ts" setup>
import { PageCategory } from '@11thdeg/skaldstore/dist/entries/Site'
import { Ref, ref, onMounted, watch } from 'vue'
import { logDebug } from '../../../utils/logHelpers'
import { toMekanismiURI } from '../../../utils/toMekanismiURI'
import { CyanDialog } from '@11thdeg/cyan'

const props = defineProps<{
  chapter?: PageCategory
}>()
const emit = defineEmits<{
  (e: 'save', chapter: PageCategory): void
}>()
    
const dialog = ref<CyanDialog>()
const item:Ref<PageCategory|undefined> = ref(undefined)
    
onMounted(() => {
  watch(props, () => {
    logDebug('watch', props.chapter)
    item.value = props.chapter
    if (item.value) dialog.value?.showModal()
  })
})
    
function setField(field: string, value: string) {
  if (!item.value) return
  (item.value as unknown as Record<string,string>)[field] = value
}

function save() {
  logDebug('save', item.value)
  if (item.value) {
    if (!item.value.slug) item.value.slug = toMekanismiURI(item.value.name)
    logDebug('ChapterEditor', 'save', item.value)
    emit('save', item.value)
  }
  item.value = undefined
  dialog.value?.close()
}
function openDialog() {
  item.value = { name: '', slug: '' }
  dialog.value?.showModal()
}
function closeDialog() {
  dialog.value?.close()
}
</script>
<template>
  <cyan-toolbar>
    <cyan-spacer />
    <cyan-button
      noun="add"
      :label="$t('action.add.new')"
      text
      @click="openDialog()"
    />
  </cyan-toolbar>
  <cn-dialog
    ref="dialog"
    :label="$t('action.add.new')"
  >
    <template v-if="item">
      <cyan-textfield
        :label="$t('fields.site.chapter')"
        :value="item.name || ''"
        @change="setField('name', $event.target.value)"
      />
      <cyan-toolbar>
        <cyan-spacer />
        <cyan-button
          :label="$t('action.cancel')"
          text
          @click="closeDialog()"
        />
        <cyan-button
          :label="$t('action.save')"
          @click="save"
        />
      </cyan-toolbar>
    </template>
  </cn-dialog>
</template>