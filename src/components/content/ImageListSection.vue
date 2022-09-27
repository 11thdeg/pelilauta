<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  images: string[]
}>()
const count = computed(() => props.images.length)
</script>

<template>
  <section class="ImageListSection">
    <img
      v-for="url in images"
      :key="url"
      alt="preview"
      :src="url"
    >
    <div class="count">
      {{ count }}
    </div>
  </section>
</template>

<style lang="sass" scoped>
.ImageListSection
  display: flex
  flex-wrap: wrap
  gap: 12px
  align-items: center
  justify-content: center
  img
    max-width: 100%
    max-height: 320px
    object-fit: cover
  .count
    display: none
</style>