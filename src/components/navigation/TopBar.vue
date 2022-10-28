
<script setup lang="ts">
// import { onMounted, ref } from 'vue'

import { onMounted, ref } from 'vue';

const props = defineProps<{
  title: string,
  sticky?: boolean
}>()

const raised = ref(false)
onMounted(() => {
  if (props.sticky) {
    document.addEventListener('scroll', (e: Event) => {
      const top = window.pageYOffset || (e.target as HTMLElement).scrollTop || 0
      raised.value = top > 2
    })
  }
})
</script>

<template>
  <cyan-toolbar
    id="TopBar"
    :class="{ sticky: sticky, 'overlay': raised }"
    class="rise-a"
  >
    <cyan-icon
      noun="back"
      class="clickable hoverable"
      @click="$router.back()"
    />
    <h1 class="TypeHeadline5">
      {{ title }}
    </h1>
    <cyan-spacer />
    <slot />
  </cyan-toolbar>
</template>

<style lang="sass" scoped>
#TopBar
  &.sticky
    position: -webkit-sticky
    position: sticky
    top: 0px
    z-index: 100000
    transition: all 0.2s ease-in-out
    margin-left: -8px
    padding-left: 8px
    &.overlay
      transition: all 0.6s ease-in-out
      box-shadow: 0px 0px 55px -12px var(--chroma-secondary-d)
</style>