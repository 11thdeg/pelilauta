<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  images?: string[]
  edit?: boolean
}>()
const emit = defineEmits<{
  (e: 'remove-image', image: string): void
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
      class="imageContainer"
    >
      <cyan-button
        v-if="edit"
        noun="trashcan"
        text
        class="remove"
        @click="emit('remove-image', url)"
      />
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
  .imageContainer
    position: relative
   
    .remove
      position: absolute
      top: 4px
      right: 4px
      z-index: 1
      
</style>