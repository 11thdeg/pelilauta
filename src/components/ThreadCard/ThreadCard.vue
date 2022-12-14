<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { onMounted, Ref, ref } from 'vue'
import { fetchThread } from '../../composables/useThreads'
import TopicTag from '../threads/TopicTag.vue'
import RepliesTag from '../threads/RepliesTag.vue'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import { useI18n } from 'vue-i18n'
import LoveAThreadButton from '../threads/LoveAThreadButton.vue'
import { useSubscriber } from '../../composables/useSession/useSubscriber'
import ProfileLink from '../profileLink/ProfileLink.vue'
import { useContentEntry } from '../../composables/useContentEntry'
import TopicIcon from '../threads/TopicIcon.vue'
import YoutubePreview from '../content/YoutubePreview.vue'

const props = defineProps<{
  threadkey?: string
}>()

const thread:Ref<Thread|undefined> = ref(undefined)

const { t } = useI18n()

onMounted(async () => {
  if (props.threadkey) thread.value = await fetchThread(props.threadkey)
  const { snippet:s } = useContentEntry(thread.value)
  snippet.value = s.value
})

const snippet = ref('')

const { subscriber } = useSubscriber()
const notify = computed(() => {
  if (!thread.value || !thread.value.key) return false
  if (!subscriber.value) return false
  return subscriber.value.shouldNotify(thread.value.key, thread.value.flowTime)
})

const level = computed(() => {
  return notify.value === true ? 2 : 1
})
</script>

<template>
  <cyan-card
    v-if="thread"
    class="ThreadCard"
    :elevation="level"
    :class="{
      'notify': notify
    }"
  >
    <TopicIcon
      slot="avatar"
      :slug="thread.topicid || 'pelilauta' "
    />
    <h3
      slot="title"
      class="downscaled"
    >
      <router-link :to="`/threads/${thread.key}`">
        {{ thread.title }}
      </router-link>
    </h3>
    <div
      v-if="thread.youtubeId"
      class="videoContainer"
      style="margin: 12px -12px"
    >
      <YoutubePreview
        style="margin: 0 auto"
        :video-id="thread.youtubeId"
      />
    </div>
    <p
      v-else
      class="TypeBody2"
      :innerHTML="snippet"
    />
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
      <RepliesTag :threadkey="thread.key || ''" />
    </cyan-toolbar>
  </cyan-card>
</template>

<style lang="sass" scoped>
.videoContainer
  background:  linear-gradient(90deg, hsla(var(--chroma-secondary-a-hsl), 0.5), hsla(var(--chroma-secondary-a-hsl), 1) 50%, hsla(var(--chroma-secondary-a-hsl), 0.5) 100%)
  text-align: center
.ThreadCard
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