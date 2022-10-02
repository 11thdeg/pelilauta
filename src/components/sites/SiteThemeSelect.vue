<script lang="ts" setup>
import { computed } from 'vue'
import { useMeta } from '../../composables/useMeta'

const props = defineProps<{
  modelValue: string;
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const { siteThemes } = useMeta()

const selected = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

const options = computed(() => siteThemes.value.map(theme => ({
  label: theme.name,
  value: theme.id
})))
</script>

<template>
  <cyan-select
    :value="selected"
    :options="options"
    @change="selected = $event.target.value"
  />
</template>