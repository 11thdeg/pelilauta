<script setup lang="ts">
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import { toRefs } from 'vue'

const props = defineProps<{
  site: {
    key: string,
    name: string
  },
  name: string,
  flowTime: number
}>()
const { site, name, flowTime } = toRefs(props)
</script>

<template>
  <nav class="BreadCrumbs flex space-between border-bottom">
    <p class="TypeCaption m-0">
      <RouterLink :to="`/sites/${site.key}`">
        {{ site.name }} 
      </RouterLink> 
      / {{ name }}
    </p>
    <FlowTimeCaption :flow-time="flowTime" />
  </nav>
</template>
