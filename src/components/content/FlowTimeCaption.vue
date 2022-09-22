<script lang="ts" setup>
import { logDebug } from '../../utils/loghelpers'
import { toDisplayString } from '../../utils/toDisplayString'

const props = defineProps<{
  flowTime: number|null
}>()

logDebug('FlowTimeCaption', 'props', props)
</script>

<template>
  <div class="TypeCaption">
    {{ toDisplayString(flowTime) }}
  </div>
</template>