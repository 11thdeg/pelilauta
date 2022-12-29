<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { logDebug } from '../../utils/logHelpers'
import { useAssets } from '../../composables/useAssets'
import UploadAssetForm from '../UploadAssetForm/UploadAssetForm.vue'

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

function close () {
  emit('update:modelValue', false)
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
    <cyan-dialog
      :title="t('assets.add.title')"
      :open="modelValue"
      @close="close"
    >
      <UploadAssetForm
        @upload="insertSelectedAsset"
      />
    </cyan-dialog>
  </teleport>
</template>