<script setup lang="ts">
import RestrictedContent from '../RestrictedContent/RestrictedContent.vue'

const props = defineProps<{
  forbidden: boolean
}>()
</script>

<template>
  <div
    v-if="props.forbidden"
    class="Column"
  >
    <RestrictedContent />
  </div>
  <template v-else>
    <slot />
  </template>
</template>