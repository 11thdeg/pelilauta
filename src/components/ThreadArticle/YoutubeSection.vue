<script setup lang="ts">
import { toRefs } from 'vue'
import YoutubePreview from '../content/YoutubePreview.vue'

const props = defineProps<{
  videoId: string
}>()
const { videoId } = toRefs(props)

</script>

<template>
  <section class="youtube">
    <YoutubePreview
      :video-id="videoId"
      :width="600"
      style="margin: 12px 0"
    />
  </section>
</template>