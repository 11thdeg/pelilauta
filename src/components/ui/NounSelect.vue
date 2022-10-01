<script lang="ts" setup>
import { ref } from 'vue'
import nounsFile from '../../nouns.json'
import { logDebug } from '../../utils/logHelpers'

const props = defineProps<{
  label?: string
  modelValue?: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()


const nouns = Object.keys((nounsFile as Record<string, string>)).map(key => ({ value:key, label: key }))
const icon = ref(props.modelValue || '')

function updateIcon(value: string) {
  logDebug('updateIcon', value)
  icon.value = value
  emit('update:modelValue', value)
}

</script>
<template>
  <div class="NounSelect">
    <div class="icon">
      <cyan-icon
        v-if="icon"
        :noun="icon"
      />
    </div>
    <div class="select">
      <cyan-select
        :label="label"
        :value="modelValue"
        :options="nouns"
        @change="updateIcon($event.target.value)"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.NounSelect
  display: flex
  gap: 12px
  .icon
    width: 48px
    flex-grow: 0
  .select
    flex-grow: 1
</style>