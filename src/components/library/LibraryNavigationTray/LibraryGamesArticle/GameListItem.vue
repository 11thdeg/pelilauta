<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  game: {
    key?: string
    name: string
    system: string
    systemBadge: string
  }
}>()

const noun = computed(() => props.game.systemBadge || props.game.system || 'mekanismi')
const to = computed(() => `/sites/${props.game.key}`)
</script>

<template>
  <li>
    <router-link
      :to="to"
      class="flex mx-0 p-1 hoverable clickable"
    >
      <cyan-icon
        :noun="noun"
      />
      <h4 class="downscaled my-0">
        {{ game.name }}
      </h4>
    </router-link>
  </li>
</template>

<style lang="sass" scoped>
li
  list-style: none
  margin-bottom: 8px
</style>