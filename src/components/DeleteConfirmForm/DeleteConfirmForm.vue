<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: boolean
  title: string
  message?: string
  confirmText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { t } = useI18n()
const verifier = computed(() => props.confirmText || t('deleteConfirm.defaultVerifier'))

function handleConfirm (e: Event) {
  const target = e.target as HTMLInputElement
  const v = target.value === verifier.value
  emit('update:modelValue', v)
}
</script>

<template>
  <div>
    <h4>{{ title }}</h4>
    <p class="TypeBody2 lowEmphasis">
      {{ message }}
    </p>
    <p class="TypeBody2 lowEmphasis">
      {{ t('deleteConfirm.info') }} {{ verifier }}
    </p>
    <cyan-toolbar>
      <cyan-textfield
        :label="t('deleteConfirm.fieldLabel')"
        style="width: calc(100% - 48px)"
        @change="handleConfirm($event)"
      />
      <cyan-icon
        v-if="modelValue"
        noun="check"
      />
    </cyan-toolbar>
  </div>
</template>
