<script lang="ts" setup>
import { computed } from 'vue'
import { useContentEntry } from '../../composables/useContentEntry'
import ImageListSection from '../content/ImageListSection.vue'
import YoutubePreview from '../content/YoutubePreview.vue'

const props = defineProps<{
  thread: {
    key: string | undefined
    images: string[] | undefined
    youtubeId: string | undefined
    markdownContent: string | undefined
    htmlContent: string | undefined
  }
}>()

const mode = computed(() => {
  if (props.thread.youtubeId) return 'youtube'
  if (props.thread.images && props.thread.images.length > 0) return 'image'
  return 'text'
})

const { snippet } = useContentEntry(props.thread)

</script>
<template>
  <div
    v-if="mode === 'youtube'"
    class="videoContainer"
    style="margin: 12px -12px"
  >
    <YoutubePreview
      style="margin: 0 auto"
      :video-id="thread.youtubeId || ''"
    />
  </div>
  <template v-else>
    <div
      v-if="mode === 'image'"
      style="margin: 12px -12px"
    >
      <ImageListSection
        :images="thread.images"
      />
    </div>
    <div :innerHTML="snippet" />
  </template>
</template>