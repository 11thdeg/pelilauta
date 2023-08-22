<script lang="ts" setup>
import { useContentEntry } from '../../composables/useContentEntry'
import { useSession } from '../../composables/useSession'
import WatchButton from '../WatchButton/WatchButton.vue'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import ImageListSection from '../content/ImageListSection.vue'
import YoutubePreview from '../content/YoutubePreview.vue'
import ProfilePane from '../profiles/ProfilePane.vue'
import LoveAThreadButton from '../threads/LoveAThreadButton.vue'

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
</script>

<template>
  <article class="ThreadArticle">
    <h1 class="hideOnMobile downscaled">
      {{ thread.title }}
    </h1>
    <div
      v-if="thread.youtubeId"
      class="youtube"
    >
      <YoutubePreview
        :video-id="thread.youtubeId"
        :width="600"
        style="margin: 12px 0"
      />
    </div>
    <ImageListSection
      v-if="thread.images && thread.images.length > 0"
      :images="thread.images"
    />
    <div :innerHTML="content" />
    <!-- footer -->
    <cyan-toolbar>
      <FlowTimeCaption :flow-time="thread.flowTime" />
      <cyan-spacer />
      <WatchButton
        v-if="!anonymous"
        :entry="thread"
      />
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