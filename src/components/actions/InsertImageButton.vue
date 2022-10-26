<script lang="ts" setup>
import { ref } from 'vue'
import { logDebug } from '../../utils/logHelpers'
import SelectAssetDialog from '../assets/SelectAssetDialog.vue'

const emit = defineEmits<{
  (e: 'insert', asset: string): void
}>()

const showDialog = ref(false)

function selectAsset(asset: string) {
  emit('insert', asset)
  logDebug('Inserting asset', asset)
  showDialog.value = false
}
</script>

<template>
  <cyan-button
    noun="assets"
    text
    @click="showDialog = true"
  />
  <SelectAssetDialog
    v-model="showDialog"
    @select="selectAsset($event)"
  />
</template>