<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { onMounted, Ref, ref } from 'vue'
import { fetchThread } from '../../composables/useThreads'
import TopicTag from './TopicTag.vue'
import RepliesTag from './RepliesTag.vue'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import { useI18n } from 'vue-i18n'
import LoveAThreadButton from './LoveAThreadButton.vue'
import { useSubscriber } from '../../composables/useSession/useSubscriber'
import ProfileLink from '../profileLink/ProfileLink.vue'

const props = defineProps<{
  threadkey?: string
}>()

const thread:Ref<Thread|undefined> = ref(undefined)

const { t } = useI18n()

onMounted(async () => {
  if (props.threadkey) thread.value = await fetchThread(props.threadkey)
})

const snippet = computed(() => {
  if (!thread.value) return ''
  if (thread.value.markdownContent) return thread.value.markdownContent.slice(0, 240) + '...'
  const div = document.createElement('div')
  div.innerHTML = thread.value.htmlContent
  let snip = ''
  if (div.firstChild) {
    snip = div.firstChild.textContent || ''
    if (snip.length > 240) snip = snip.substring(0, 240) + '...'
  }
  if (snip.length < 239 && div.firstChild?.nextSibling) {
    snip += '<br><br>' + div.firstChild.nextSibling.textContent || ''
    if (snip.length > 240) snip = snip.substring(0, 240) + '...'
  } 
  return snip
})

const siteIcon = computed(() => undefined)

const { subscriber } = useSubscriber()
const notify = computed(() => {
  if (!thread.value || !thread.value.key) return false
  if (!subscriber.value) return false
  return subscriber.value.shouldNotify(thread.value.key, thread.value.flowTime)
})
</script>

<template>
  <article
    v-if="thread"
    class="ThreadCard card"
    :class="{
      'rise-a': !notify,
      'rise-b': notify,
      'notify': notify
    }"
  >
    <section class="cardHeader">
      <div class="meta">
        <h3>
          <router-link :to="`/threads/${thread.key}`">
            {{ thread.title }}
          </router-link>
        </h3>
      </div>
      <cyan-spacer />
      <cyan-icon
        v-if="siteIcon"
        :noun="siteIcon"
      />
    </section>
    <p
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
        {{ t('threads.inTopic') }} <TopicTag :slug="thread.topicid || ''" />
      </div>
      <cyan-spacer />
      <RepliesTag :threadkey="thread.key || ''" />
    </cyan-toolbar>
  </article>
</template>

<style lang="sass" scoped>

.ThreadCard
  position: relative
  &.card
    padding: 16px
    p
      margin-bottom: 16px
.cardHeader
  display: flex
  margin-bottom: 16px
  .meta
    a
      color: var(--cyan-heading-color-a)
      text-decoration: none
    h3, p
      margin: 0
    h3
      line-height: 24px

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