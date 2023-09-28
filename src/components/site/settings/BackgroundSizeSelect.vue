<script lang="ts" setup>
// A Wrapper for native select element, for selecting background size
// Optons are: cover, contain and repeat (which correlates to 
// 'background-size: auto; background-repeat: repeat;')
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(v: string) {
    emits('update:modelValue', v)
  }
})

</script>

<template>
  <label>
    {{ $t('fields.site.backgroundsize.label') }}
    <select
      v-model="value"
      class="TypeUI"
    >
      <option
        value="cover"
      >
        {{ $t('fields.site.backgroundsize.cover') }}
      </option>
      <option
        value="contain"
      >
        {{ $t('fields.site.backgroundsize.contain') }}
      </option>
      <option
        value="repeat"
      >
        {{ $t('fields.site.backgroundsize.repeat') }}
      </option>
    </select>
  </label>
</template>