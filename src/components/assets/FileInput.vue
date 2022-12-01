<script lang="ts" setup>
import { processAsset, FileData } from '../../utils/fileHelpers'
import { logError } from '../../utils/loghelpers'
    
const props = defineProps<{
  file?: FileData
}>()

const emit = defineEmits<{
  (e: 'update:file', file: FileData): void
}>()
    
async function onFileChange (e: Event) {
  try {
    const uploadData = await processAsset(e)
    emit('update:file', uploadData)
  } catch (error) {
    logError(error)
  }
}
</script>
    
<template>
  <label class="FileInput">
    <template v-if="!props.file">
      <input
        type="file"
        class="FileInputInput"
        @change="onFileChange"
      >
      <cyan-icon
        dark
        noun="assets"
        xlarge
      />
    </template>
    <img
      v-else
      class="FileInputImage"
      :src="props.file.dataURL"
    >
  </label>
</template>
    
<style lang="sass" scoped>
label.FileInput
  display: block
  width: 128px
  height: 128px
  background-color: var(--chroma-secondary-f)
  border: none
  border-radius: 8px
    
input[type="file"]
  display: none

.FileInputImage
  width: 122px
  height: 122px
  margin: 3px
  object-fit: cover
  border-radius: 7px
</style>