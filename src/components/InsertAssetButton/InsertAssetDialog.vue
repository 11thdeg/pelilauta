<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const close = () => {
  emit('update:modelValue', false)
}
</script>
<template>
  <teleport to="body">
    <cyan-dialog
      title="select or upload asset"
      :open="modelValue"
      @close="close"
    >
      aaa
    </cyan-dialog>
  </teleport>
</template>