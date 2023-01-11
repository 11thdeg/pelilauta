<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMeta } from '../../composables/useMeta'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { t } = useI18n()
const { siteLicenses } = useMeta()

const options = computed(() => {
  const def = [
    {
      value: '-',
      label: t('fields.asset.noLicense')
    }
  ]
  return [...def, ...siteLicenses.value?.map((l) => ({
    value: l.id,
    label: l.name
  }))]
})
const license = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

</script>

<template>
  <cyan-select
    v-if="siteLicenses"
    :value="license"
    :label="t('fields.asset.license')"
    :options="options"
    @change="(license = $event.target.value)"
  />
</template>