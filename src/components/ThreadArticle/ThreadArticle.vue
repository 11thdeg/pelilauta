<script lang="ts" setup>
import { computed } from 'vue'
import { useContentEntry } from '../../composables/useContentEntry'
import { useSession } from '../../composables/useSession'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import ImageListSection from '../content/ImageListSection.vue'
import ProfilePane from '../profiles/ProfilePane.vue'
import LoveAThreadButton from '../threads/LoveAThreadButton.vue'
import YoutubeSection from './YoutubeSection.vue'
import { postProcessContent } from '../../utils/content/postProcessContent'
import SeenButton from './SeenButton.vue'

const props = defineProps<{
  thread: {
    key?: string
    title: string
    youtubeId?: string
    images?: string[]
    markdownContent?: string
    htmlContent?: string
    topicid?: string
    author: string
    flowTime: number
    lovedCount: number
    followerCount: number
    hasOwner: (uid:string) => boolean
  }
}>()

const { anonymous, uid } = useSession()
// eslint-disable-next-line vue/no-setup-props-destructure
const { content } = useContentEntry(props.thread)

const processedContent = computed(() => {
  const c = postProcessContent(content.value)
  return c.outerHTML
})
</script>

<template>
  <article class="ThreadArticle">
    <h1 class="downscaled">
      {{ thread.title }}
    </h1>
    
    <YoutubeSection
      v-if="thread.youtubeId"
      :video-id="thread.youtubeId"
    />

    <ImageListSection
      v-if="thread.images && thread.images.length > 0"
      :images="thread.images"
    />
    <div :innerHTML="processedContent" />
    <!-- footer -->
    <cyan-toolbar>
      <FlowTimeCaption :flow-time="thread.flowTime" />
      <cyan-spacer />
      <SeenButton :thread="thread" />
      <LoveAThreadButton
        :disabled="anonymous"
        :thread="thread"
      />
    </cyan-toolbar>
    <ProfilePane
      v-if="!thread.hasOwner(uid)"
      :uid="thread.author"
    />
  </article>
</template>

<style lang="sass" scoped>
.youtube
  background: var(--cyan-background-overlay-dark)
  width: 100%
  display: flex
  justify-content: center
</style>