<script lang="ts" setup>
import { ref } from 'vue'
import AddAssetDialog from './AddAssetDialog.vue'

const dialog = ref(false)

const emit = defineEmits<{
  (e: 'insert', value: string): void
}>()

function insertAsset (key: string) {
  emit('insert', key)
}
</script>

<template>
  <cyan-button
    noun="assets"
    text
    @click="dialog = true"
  />
  <AddAssetDialog
    v-model="dialog"
    @insert="insertAsset"
  />
</template>