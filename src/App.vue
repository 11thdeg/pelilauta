<script setup lang="ts">
import NavigationRail from './components/ui/NavigationRail.vue'
import SnackBar from './components/ui/SnackBar.vue'
import { useUxState } from './composables/useUXState'

const { navTrayVisible } = useUxState()
</script>

<template>
  <NavigationRail />
  <div
    id="appContainer"
    :class="{ navTrayVisible: navTrayVisible }"
  >
    <router-view />
  </div>
  <SnackBar />
</template>

<style lang="sass" scoped>
@media screen and (min-width: 600px)
  div#appContainer
    margin: 0
    padding: 0
    padding-left: 80px
    &.navTrayVisible
      padding-left: calc(72px + 256px + 12px)
</style>

