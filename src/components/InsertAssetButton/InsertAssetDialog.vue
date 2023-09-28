<script lang="ts" setup>
import { ref, watch } from 'vue'
import { CyanDialog, CyanTabs } from '@11thdeg/cyan'
import { useI18n } from 'vue-i18n'
import UploadAssetForm from '../UploadAssetForm/UploadAssetForm.vue'
import SelectAssetForm from './SelectAssetForm.vue'
import { logDebug } from '../../utils/logHelpers'
import { useAssets } from '../../composables/useAssets'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'insert', value: string): void
}>()

const { t } = useI18n()
const { fetchAsset } = useAssets()

const tabs = [
  ['upload', t('insertAssetDialog.upload')],
  ['select', t('insertAssetDialog.select')]
]

const mode = ref('select')
const dialog = ref<CyanDialog>()

watch(() => props.modelValue, (value) => {
  if (value) {
    dialog.value?.showModal()
  }
})

function selectTab(e: Event) {
  const tab = (e.target as CyanTabs).active
  console.log(tab)
  mode.value = tab
}

function close () {
  if (props.modelValue) {
    emit('update:modelValue', false)
    if (dialog.value && dialog.value.open) {
      dialog.value.close()
    }
  }
}

function insertSelectedAsset(key: string) {
  const asset = fetchAsset(key)
  logDebug('insertSelectedAsset', key, asset)
  emit('insert', key)
  close()
}

</script>

<template>
  <teleport to="body">
    <cn-dialog
      ref="dialog"
      :title="$t('action.selectImage')"
      :open="modelValue"
      @close="close"
    >
      <cn-tabs
        :tabs="tabs"
        :active="mode"
        @change="selectTab"
      />
      <br>
      <SelectAssetForm
        v-if="mode === 'select'"
        @change="insertSelectedAsset"
        @cancel="close"
      />
      <UploadAssetForm
        v-else
        @upload="insertSelectedAsset"
      />
    </cn-dialog>
  </teleport>
</template>