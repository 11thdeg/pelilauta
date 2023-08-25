<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  tagkey: string;
  entry: {
    key: string;
    entryTitle: string;
    entryPath: string[];
    tags: string[];
  };
}>()

const entryRoute = computed(() => {
  if(props.entry.entryPath[0] === 'stream') {
    return '/threads/' + props.entry.entryPath[1]
  }
  return '/' + props.entry.entryPath.join('/')
})
const additionalTags = computed(() => props.entry.tags.filter((t: string) => t !== props.tagkey).join(', '))
</script>

<template>
  <li class="TagEntryItem">
    <router-link :to="entryRoute">
      {{ entry.entryTitle }} 
      <span v-if="additionalTags">({{ additionalTags }})</span> 
    </router-link>
  </li>
</template>