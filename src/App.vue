<script setup lang="ts">
import NavigationRail from './components/navigation/NavigationRail.vue'
import SnackBar from './components/ui/SnackBar.vue'
import { useUxState } from './composables/useUXState'
import EulaDialog from './components/account/EulaDialog.vue'

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
  <EulaDialog />
  <SnackBar />
</template>

<style lang="sass" scoped>
@media screen and (min-width: 600px)
  div#appContainer
    margin: 0
    padding: 0
    margin-left: 76px
    position: relative
    &.navTrayVisible
      margin-left: 324px
</style>

