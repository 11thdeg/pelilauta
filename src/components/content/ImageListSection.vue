<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  images?: string[]
}>()
const imageList = computed(() => {
  return props.images || []
})
</script>

<template>
  <section class="ImageListSection">
    <div
      v-for="url in imageList"
      :key="url"
    >
      <a
        :href="url"
        target="_blank"
      >
        <img
          alt="preview"
          :src="url"
        >
      </a>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.ImageListSection
  display: flex
  gap: 12px
  margin: 6px 0
  padding: 6px 12px
  background: var(--cyan-background-overlay-dark)
  border-radius: 8px
  overflow: hidden
  align-items: center
  justify-content: center
  img
    flex-shrink: 1
    max-height: 320px
    // object-fit: cover
  .count
    display: none
</style>