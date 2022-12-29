<script lang="ts" setup>
import { Asset } from '@11thdeg/skaldstore'
import { ref } from 'vue'
import { useScreenSize } from '../../composables/useScreenSize'
import { FileData } from '../../utils/fileHelpers'
import AssetEntryForm from '../assets/AssetEntryForm.vue'
import FileInput from '../assets/FileInput.vue'

const emit = defineEmits<{
  (e: 'upload:asset', value: Asset): void}
>()

const { isSmall } = useScreenSize()

const file = ref<FileData | undefined>(undefined)
const assetData = ref(new Asset())

function cancel () {
  file.value = undefined
  assetData.value = new Asset()
}

</script>
<template>
  <form class="UploadAssetForm">
    <div
      class="flex"
      :class="{ 'flex-column': isSmall }"
    >
      <section>
        <FileInput
          :file="file"
          @update:file="file = $event"
        />
      </section>
      <section style="flex-grow: 1;">
        <AssetEntryForm v-model="assetData" />
      </section>
    </div>
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
        @click="emit('upload:asset', new Asset())"
      />
    </cyan-toolbar>
  </form>
</template>