<script lang="ts" setup>
import { ref } from 'vue'
import InsertAssetDialog from './InsertAssetDialog.vue'

const dialog = ref(false)
</script>

<template>
  <cyan-button
    label="insert asset"
    text
    @click="dialog = true"
  />
  <InsertAssetDialog
    v-model="dialog"
  />
</template>