<script setup lang="ts">
import PageIndex from '../../SiteTray/PageIndex.vue'
import SiteTrayHeader from './SiteTrayHeader.vue'
</script>

<template>
  <article class="small column surface">
    <SiteTrayHeader />
    <PageIndex />
  </article>
</template>

<style scoped lang="sass">
.surface
  border-radius: var(--cn-padding)
  padding: var(--cn-padding)
  overflow: hidden

</style>