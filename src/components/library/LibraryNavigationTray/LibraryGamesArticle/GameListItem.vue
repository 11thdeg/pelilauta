<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  game: {
    name: string
    system: string
    systemBadge: string
  }
}>()

const noun = computed(() => props.game.systemBadge || props.game.system || 'mekanismi')

</script>

<template>
  <li class="flex mx-0 px-0 hoverable clickable">
    <cyan-icon
      :noun="noun"
    />
    <h4 class="downscaled my-0">
      {{ game.name }}
    </h4>
  </li>
</template>