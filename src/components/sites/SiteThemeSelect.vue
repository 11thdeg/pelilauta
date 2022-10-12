<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';
import { useMeta } from '../../composables/useMeta'

const { t } = useI18n()

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
    :label="t('fields.site.system')"
    :value="selected"
    :options="options"
    @change="selected = $event.target.value"
  />
</template>