<script setup lang="ts">
const props = defineProps<{
  small?: boolean
  suspended: boolean
}>()
</script>

<template>
  <cyan-loader
    v-if="props.suspended"
    :large="!props.small"
    style="margin: 0 auto"
  />
  <template v-else>
    <slot />
  </template>
</template>