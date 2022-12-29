<script lang="ts" setup>
import { ref } from 'vue'
import { CyanTabs } from '@11thdeg/cyan'
import { useI18n } from 'vue-i18n'
import UploadAssetForm from '../UploadAssetForm/UploadAssetForm.vue'
import SelectAssetForm from './SelectAssetForm.vue'
import { logDebug } from '../../utils/logHelpers'
import { useAssets } from '../../composables/useSession/useAssets'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'insert', value: string): void
}>()

const { t } = useI18n()
const { getAsset } = useAssets()

const tabs = [
  ['upload', t('insertAssetDialog.upload')],
  ['select', t('insertAssetDialog.select')]
]

const mode = ref('select')

function selectTab(e: Event) {
  const tab = (e.target as CyanTabs).active
  console.log(tab)
  mode.value = tab
}

function close () {
  emit('update:modelValue', false)
}

function insertSelectedAsset(key: string) {
  const asset = getAsset(key)
  logDebug('insertSelectedAsset', key, asset)
  emit('insert', key)
  close()
}

</script>

<template>
  <teleport to="body">
    <cyan-dialog
      title="select or upload asset"
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
      <UploadAssetForm v-else />
    </cyan-dialog>
  </teleport>
</template>