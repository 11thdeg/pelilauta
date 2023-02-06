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
  <li class="flex m0 p0">
    <cyan-icon
      :noun="noun"
    />
    <h4 class="downscaled">
      {{ game.name }}
    </h4>
  </li>
</template>