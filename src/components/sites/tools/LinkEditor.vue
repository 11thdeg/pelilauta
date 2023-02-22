<script lang="ts" setup>
import { CyanDialog } from '@11thdeg/cyan'
import { SiteLink } from '@11thdeg/skaldstore/dist/entries/Site'
import { Ref, ref, onMounted, watch } from 'vue'
import { logDebug } from '../../../utils/logHelpers'
    
const props = defineProps<{
  link?: SiteLink
}>()
const emit = defineEmits<{
  (e: 'save', link: SiteLink ): void
}>()
  
const dialog = ref<CyanDialog>()
const item:Ref<SiteLink|undefined> = ref(undefined)
    
onMounted(() => {
  watch(props, () => {
    logDebug('watch', props.link)
    item.value = props.link
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
    logDebug('LinkEditor', 'save', item.value)
    emit('save', item.value)
  }
  item.value = undefined
  dialog.value?.close()
}

function openDialog() {
  item.value = { name: '', url: '' }
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
        :label="$t('fields.site.link.name')"
        :value="item.name || ''"
        @change="setField('name', $event.target.value)"
      />
      <cyan-textfield
        :label="$t('fields.site.link.url')"
        :value="item.url || ''"
        @change="setField('url', $event.target.value)"
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