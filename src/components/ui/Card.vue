<script lang="ts" setup>import { computed, useSlots } from 'vue'

const props = defineProps<{
  rise?: number // Defaults to 1
}>()
    
const classes = computed(() => ({
  'rise-a': props.rise === 0,
  'rise-b': props.rise === undefined || props.rise === 1,
  'rise-c': props.rise === 2,
  'rise-d': props.rise === 3
}))
    
const slots = useSlots()
const hasActions = computed(() => !!slots.actions)
</script>
    
<template>
  <div
    class="card"
    :class="classes"
  >
    <slot />
    <cyan-toolbar
      v-if="hasActions"
      class="bottomActions"
    >
      <cyan-spacer />
      <slot name="actions" />
    </cyan-toolbar>
  </div>
</template>
    
<style lang="sass" scoped>
.card
  border-radius: 12px
  padding: 8px 16px
  margin: 0
  position: relative
</style>