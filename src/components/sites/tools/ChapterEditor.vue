<script lang="ts" setup>
import { PageCategory } from '@11thdeg/skaldstore/dist/entries/Site'
import { Ref, ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { logDebug } from '../../../utils/logHelpers'
import { toMekanismiURI } from '../../../utils/toMekanismiURI'
import Dialog from '../../ui/Dialog.vue'
    
const props = defineProps<{
  chapter?: PageCategory
}>()
const emit = defineEmits<{
  (e: 'save', chapter: PageCategory): void
}>()
    
const { t } = useI18n()    
const item:Ref<PageCategory|undefined> = ref(undefined)

const open = computed({
  get: () => !!item.value,
  set: (value) => {
    if (!value) item.value = undefined
  }
})
    
onMounted(() => {
  watch(props, () => {
    logDebug('watch', props.chapter)
    item.value = props.chapter
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
}
</script>
<template>
  <cyan-toolbar>
    <cyan-spacer />
    <cyan-button
      noun="add"
      :label="t('action.add.new')"
      text
      @click="item = { name: '', slug: '' }"
    />
  </cyan-toolbar>
  <Dialog
    v-model="open"
    :label="t('action.add.new')"
  >
    <template v-if="item">
      <cyan-textfield
        :label="t('fields.site.chapter')"
        :value="item.name || ''"
        @change="setField('name', $event.detail)"
      />
      <cyan-toolbar>
        <cyan-spacer />
        <cyan-button
          :label="t('action.cancel')"
          text
          @click="open = false"
        />
        <cyan-button
          :label="t('action.save')"
          @click="save"
        />
      </cyan-toolbar>
    </template>
  </Dialog>
</template>