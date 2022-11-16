<script setup lang="ts">
const props = defineProps<{
  suspended: boolean
}>()
</script>

<template>
  <cyan-loader
    v-if="props.suspended"
    large
  />
  <template v-else>
    <slot />
  </template>
</template>