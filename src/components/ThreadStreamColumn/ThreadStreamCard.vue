<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSubscriber } from '../../composables/useSession/useSubscriber'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import ProfileLink from '../profileLink/ProfileLink.vue'
import LoveAThreadButton from '../threads/LoveAThreadButton.vue'
import RepliesTag from '../threads/RepliesTag.vue'
import TopicIcon from '../threads/TopicIcon.vue'
import TopicTag from '../threads/TopicTag.vue'
import ContentPreviewSection from './ContentPreviewSection.vue'

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

const { t } = useI18n()

const key = computed(() => {
  return props.thread.key || ''
})

const topicid = computed(() => {
  return props.thread.topicid || 'yleinen'
})

const { subscriber } = useSubscriber()
const notify = computed(() => {
  if (!props.thread.key) return false
  if (!subscriber.value) return false
  return subscriber.value.shouldNotify(props.thread.key,props.thread.flowTime)
})

const level = computed(() => {
  return notify.value === true ? 2 : 1
})

</script>

<template>
  <cyan-card
    v-if="thread"
    class="ThreadStreamCard"
    :elevation="level"
    :class="{
      'notify': notify
    }"
  >
    <TopicIcon
      slot="avatar"
      :slug="topicid"
    />
    <h3
      slot="title"
      class="downscaled"
    >
      <router-link :to="`/threads/${key}`">
        {{ thread.title }}
      </router-link>
    </h3>
    <ContentPreviewSection :thread="thread" />
    <cyan-toolbar
      small
      style="margin-bottom: 4px"
    >
      <ProfileLink :uid="thread.author" />
      <cyan-spacer />
      <FlowTimeCaption :flow-time="thread.flowTime" />
    </cyan-toolbar>
    <cyan-toolbar small>
      <LoveAThreadButton :thread="thread" />
      <div class="TypeCaption">
        <span class="hideOnMobile">{{ t('threads.inTopic') }}</span> <TopicTag :slug="thread.topicid || ''" />
      </div>
      <cyan-spacer />
      <RepliesTag :thread="thread" />
    </cyan-toolbar>
  </cyan-card>
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