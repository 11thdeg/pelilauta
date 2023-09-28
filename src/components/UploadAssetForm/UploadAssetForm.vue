<script lang="ts" setup>
import { Asset } from '@11thdeg/skaldstore'
import { ref, onMounted } from 'vue'
import { useSession } from '../../composables/useSession'
import { useAssets } from '../../composables/useAssets'
import { FileData } from '../../utils/fileHelpers'
import AssetEntryForm from '../assets/AssetEntryForm.vue'
import FileInput from '../assets/FileInput.vue'

const emit = defineEmits<{
  (e: 'upload', value: string): void}
>()
const { uid } = useSession()

const file = ref<FileData | undefined>(undefined)
const assetData = ref(new Asset())

onMounted(() => {
  assetData.value.owners = uid.value
})

function cancel () {
  file.value = undefined
  assetData.value = new Asset()
}

function handleFileInput (f: FileData) {
  file.value = f
  if (f) {
    if(!assetData.value.name) {
      assetData.value.name = f.name
      assetData.value.mimetype = f.mimetype
    }
  }
}

const { uploadAssetFileData } = useAssets()
async function handleUpload () {
  if (!file.value) throw new Error('No file to upload')
  if (!assetData.value.name) throw new Error('No asset name')

  const key = await uploadAssetFileData(assetData.value, file.value)
  emit('upload', key)
  file.value = undefined
  assetData.value = new Asset()
}

</script>
<template>
  <form class="UploadAssetForm">
    <fieldset>
      <legend>{{ $t('uploadAssetForm.legend') }}</legend>
      <!-- This wrapper div is just to place the image upload button left of the fields, for md and up-->
      <div class="flex flex-row sm-flex-column align-top">
        <FileInput
          :file="file"
          @update:file="handleFileInput"
        />
        <AssetEntryForm v-model="assetData" />
      </div>
    </fieldset>
    
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        text
        :label="$t('action.cancel')"
        @click="cancel"
      />
      <cyan-button
        :disabled="!file"
        :label="$t('action.upload')"
        @click="handleUpload"
      />
    </cyan-toolbar>
  </form>
</template>