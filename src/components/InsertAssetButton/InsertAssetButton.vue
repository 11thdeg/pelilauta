<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import InsertAssetDialog from './InsertAssetDialog.vue'

// Props and emits
const props = defineProps<{
  noun?: string
  label?: string
}>()
const { noun, label } = toRefs(props)

const dialog = ref(false)
const emit = defineEmits<{
  (e: 'insert', value: string): void
}>()

function insertAsset (key: string) {
  emit('insert', key)
}
</script>

<template>
  <button
    :label="label"
    class="text"
    @click.prevent="dialog = true"
  >
    <cyan-icon
      :noun="noun || 'assets'"
      small
    />
    {{ label }}
  </button>
  <InsertAssetDialog
    v-model="dialog"
    @insert="insertAsset"
  />
</template>