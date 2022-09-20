<script setup lang="ts">
import NavigationRail from './components/ui/NavigationRail.vue'
import SnackBar from './components/ui/SnackBar.vue'
</script>

<template>
  <NavigationRail />
  <div class="appContainer">
    <router-view />
  </div>
  <SnackBar />
</template>

<style lang="sass" scoped>
@media screen and (min-width: 600px)
  div.appContainer
    margin: 0
    padding: 0
    padding-left: 80px

</style>

