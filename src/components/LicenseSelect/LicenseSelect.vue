<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { t } = useI18n()

const licenses = ref([
  { label: t('fields.asset.licenses.0'), value: '0' },
  { label: t('fields.asset.licenses.1'), value: '1' },
  { label: t('fields.asset.licenses.2'), value: '2' },
  { label: t('fields.asset.licenses.3'), value: '3' },
])

const license = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

</script>

<template>
  <cyan-select
    :value="license"
    :label="t('fields.asset.license')"
    :options="licenses"
    @change="(license = $event.target.value)"
  />
</template>