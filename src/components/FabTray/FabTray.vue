<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useUxState } from '../../composables/useUXState'

const { unmountFabTray, mountFabTray } = useUxState()

onMounted(() => {
  mountFabTray()
})
onUnmounted(() => {
  unmountFabTray()
})
</script>

<template>
  <nav id="FabTray">
    <slot />
  </nav>
</template>
  
<style lang="sass" scoped>
nav#FabTray
  position: fixed
  bottom: 50px
  right: 0
  padding: 16px
  display: flex
  flex-direction: column-reverse
  align-items: flex-end
  gap: 12px
  z-index: var(--pelilauta-fabs-z-index)

@media screen and (min-width: 600px)
  nav#FabTray
    bottom: 0px
</style>