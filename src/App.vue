<script setup lang="ts">
import NavigationRail from './components/ui/NavigationRail.vue'
import AppBar from './components/ui/AppBar.vue';

</script>

<template>
  <NavigationRail />
  <div class="appContainer">
    <main>
      <AppBar />
      <router-view />
      <div>Pelilauta-Next</div>
    </main>
  </div>
</template>

<style lang="sass" scoped>
@media screen and (min-width: 600px)
  div.appContainer
    margin: 0
    padding: 0
    padding-left: 80px

</style>

