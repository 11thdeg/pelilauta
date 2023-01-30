<script lang="ts" setup>
// import { logDebug } from '../../utils/loghelpers'
import { computed } from 'vue'
import { toDisplayString } from '../../utils/toDisplayString'

const props = defineProps<{
  flowTime: number|null
}>()

const s = computed(() => {
  return toDisplayString(props.flowTime)
})

// logDebug('FlowTimeCaption', 'props', props)
</script>

<template>
  <span class="TypeBody2">
    {{ s }}
  </span>
</template>