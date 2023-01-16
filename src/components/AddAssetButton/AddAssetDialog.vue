<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { logDebug } from '../../utils/logHelpers'
import { useAssets } from '../../composables/useAssets'
import UploadAssetForm from '../UploadAssetForm/UploadAssetForm.vue'
import { watch, ref } from 'vue'
import { CyanDialog } from '@11thdeg/cyan'

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
const dialog = ref<CyanDialog>()

watch(() => props.modelValue, (value) => {
  if (value) {
    logDebug('AddAssetDialog opened')
    dialog.value?.showModal()
  }
})

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
      :title="t('assets.add.title')"
      @close="close"
    >
      <UploadAssetForm
        @upload="insertSelectedAsset"
      />
    </cn-dialog>
  </teleport>
</template>