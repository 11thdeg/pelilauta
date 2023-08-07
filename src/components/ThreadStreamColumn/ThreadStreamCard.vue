<script lang="ts" setup>
import { computed } from 'vue'
import { useContentEntry } from '../../composables/useContentEntry'
import { useMeta } from '../../composables/useMeta'
import { useSubscriber } from '../../composables/useSubscriber'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import ProfileLink from '../profileLink/ProfileLink.vue'
import LoveAThreadButton from '../threads/LoveAThreadButton.vue'
import RepliesButton from './RepliesButton.vue'

const props = defineProps<{
  thread: {
    key: string | undefined
    topicid: string | undefined,
    title: string,
    images: string[] | undefined
    youtubeId: string | undefined
    markdownContent: string | undefined
    htmlContent: string | undefined,
    flowTime: number,
    author: string,
    lovedCount: number
    hasOwner: (uid:string) => boolean,
    replyCount: number
  }
}>()

const key = computed(() => {
  return props.thread.key || ''
})

const topicid = computed(() => {
  return props.thread.topicid || 'yleinen'
})

const { shouldNotify } = useSubscriber()

const notify = computed(() => shouldNotify(props.thread.key || '',props.thread.flowTime || 0))

const level = computed(() => {
  return notify.value === true ? 2 : 1
})

const cover = computed(() => {
  if (props.thread.youtubeId) return `https://img.youtube.com/vi/${props.thread.youtubeId}/0.jpg`
  if (props.thread.images && props.thread.images.length > 0) return props.thread.images[0]
  return undefined
})

// eslint-disable-next-line vue/no-setup-props-destructure
const { snippet } = useContentEntry(props.thread)

const { streams } = useMeta()

const noun = computed(() => {
  const t = streams.value.find(s => s.slug === topicid.value)
  if (!t) return 'discussion'
  return t.icon
})

</script>

<template>
  <cn-card
    v-if="thread"
    class="ThreadStreamCard"
    :elevation="level"
    :class="{
      'notify': notify,
    }"
    :title="thread.title"
    :cover="cover"
    :snippet="snippet"
    :noun="noun"
    :link="`/threads/${key}`"
  >
    <div slot="actions">
      <section class="flex">
        <ProfileLink :uid="thread.author" />
        <cyan-spacer />
        <FlowTimeCaption :flow-time="thread.flowTime" />
      </section>

    
      <section class="flex">
        <LoveAThreadButton :thread="thread" />

        <cyan-spacer />

        <RepliesButton :thread="thread" />
      </section>
    </div>
  </cn-card>
</template>

<style lang="sass" scoped>
.videoContainer
  background:  linear-gradient(90deg, hsla(var(--chroma-secondary-a-hsl), 0.5), hsla(var(--chroma-secondary-a-hsl), 1) 50%, hsla(var(--chroma-secondary-a-hsl), 0.5) 100%)
  text-align: center
.ThreadStreamCard
  width: 100%
.notify:after
  content: ''
  position: absolute
  top: 0
  right: 0
  width: 44px
  height: 44px
  background: var(--chroma-primary-i)
  opacity: 0.22
  z-index: 0
  pointer-events: none
  transition: opacity 0.2s ease-in-out
  will-change: opacity
  clip-path: polygon(100% 0, 0 0, 100% 100%)
  border-radius: 0 12px 0 0
.cyan--mode--light .notify:after
  background: var(--chroma-primary-h)
  opacity: 0.77
</style>