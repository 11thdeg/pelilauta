<script lang="ts" setup>
import { ref, computed } from 'vue'
import InsertAssetDialog from './InsertAssetDialog.vue'

const props = defineProps<{
  noun?: string
  label?: string
}>()

const dialog = ref(false)

const emit = defineEmits<{
  (e: 'insert', value: string): void
}>()

function insertAsset (key: string) {
  emit('insert', key)
}

const label = computed(() => props.label || undefined)
const noun = computed(() => props.noun || 'assets')

</script>

<template>
  <button
    :label="label"
    class="text"
    @click="dialog = true"
  >
    <cyan-icon
      :noun="noun"
      small
    />
    {{ label }}
  </button>
  <InsertAssetDialog
    v-model="dialog"
    @insert="insertAsset"
  />
</template>