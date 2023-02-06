<script lang="ts" setup>
const props = defineProps<{
  game: {
    name: string
    system: string
  }
}>()
</script>

<template>
  <li class="flex no-margin no-padding">
    <cyan-icon
      :noun="game.system"
    />
    <h4 class="downscaled">
      {{ game.name }}
    </h4>
  </li>
</template>