<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  site: {
    name: string;
    systemBadge: string;
    description: string;
  }
}>()
const icon = computed(() => {
  return props.site.systemBadge ? props.site.systemBadge : 'adventurer'
})
</script>

<template>
  <article class="card rise-b">
    <cyan-toolbar>
      <cyan-icon :noun="icon" />
      <h3>{{ site.name }}</h3>
    </cyan-toolbar>
    
    <p class="TypeBody2">
      {{ site.description }}
    </p>
  </article>
</template>