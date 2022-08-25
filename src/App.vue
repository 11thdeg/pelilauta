<script setup lang="ts">
import NavigationRail from './components/ui/NavigationRail.vue'

</script>

<template>
  <NavigationRail />
  <main>
    <router-view />
    <div>Pelilauta-Next</div>
  </main>
</template>

<style lang="sass" scoped>
@media screen and (min-width: 768px)
  main
    margin: 0
    padding: 0
    padding-left: 80px

</style>

