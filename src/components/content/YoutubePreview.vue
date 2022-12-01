<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps<{
      videoId: string
      width?: number
      height?: number
    }>()
const w = computed(() => props.width || 440)
const h = computed(() => props.height || 247)
const IN_CARD_WIDTH = '100vw - 32px'
const style = computed(() => {
  return `width: min(${IN_CARD_WIDTH}, ${w.value}px);` +
      `height: min( ${IN_CARD_WIDTH} / 3 * 2, ${h.value}px);` //max( calc( 100vw - 36px ), ${w.value} ); height: max( calc ( (100vw - 36px) / 3 * 2, ${h.value} );`
})
</script>
    
<template>
  <section
    :style="style"
    class="YouTubePreview"
  >
    <iframe 
      class="preview"
      :src="`https://www.youtube.com/embed/${videoId}`"
      :style="style"
    />
  </section>
</template>
    
<style lang="sass" scoped>
  iframe
    border: none
</style>