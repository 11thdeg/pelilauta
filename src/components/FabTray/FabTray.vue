<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useUxState } from '../../composables/useUXState'
import ToTopFab from './ToTopFab.vue'
import ToBottomFab from './ToBottomFab.vue'
import { computed } from 'vue'

const props = defineProps<{
 fastForward?: boolean
}>()

const { unmountFabTray, mountFabTray, fieldFocused} = useUxState()

onMounted(() => {
  mountFabTray()
})
onUnmounted(() => {
  unmountFabTray()
})

const ffd = computed(() => props.fastForward)
</script>

<template>
  <nav
    v-if="!fieldFocused"
    id="FabTray"
  >
    <slot />
    <ToBottomFab v-if="ffd" />
    <ToTopFab />
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
  z-index: 12000

@media screen and (min-width: 600px)
  nav#FabTray
    bottom: 0px
</style>