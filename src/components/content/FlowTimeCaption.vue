<script lang="ts" setup>
import { toDisplayString } from '../../utils/toDisplayString'

const props = defineProps<{
  flowTime: number|null
}>()  
</script>

<template>
  <div class="TypeCaption">
    {{ toDisplayString(flowTime) }}
  </div>
</template>