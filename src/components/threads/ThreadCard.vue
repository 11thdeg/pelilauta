<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { onMounted, Ref, ref } from 'vue'
import { fetchThread } from '../../composables/useThreads'
import { toDisplayString } from '../../utils/toDisplayString'
import TopicTag from './TopicTag.vue'
import RepliesTag from './RepliesTag.vue'

const props = defineProps<{
  threadkey?: string
}>()

const thread:Ref<Thread|undefined> = ref(undefined)

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

</script>

<template>
  <article
    v-if="thread"
    class="ThreadCard"
  >
    <section class="cardHeader">
      <div class="meta">
        <h3>
          <router-link :to="`/thread/${thread.key}`">
            {{ thread.title }}
          </router-link>
        </h3>
        <p class="TypeCaption">
          <TopicTag :slug="thread.topicid || ''" />
        </p>
      </div>
      <cyan-spacer />
      <cyan-icon
        v-if="siteIcon"
        :noun="siteIcon"
      />
      <cyan-icon noun="share" />
    </section>
    <div
      class="TypeBody2"
      :innerHTML="snippet"
    />
    <cyan-toolbar>
      <cyan-tag label="author" />
      <cyan-spacer />
      <div class="TypeCaption">
        {{ toDisplayString(thread.flowTime) }}
      </div>
      <RepliesTag :threadkey="thread.key || ''" />
    </cyan-toolbar>
  </article>
</template>

<style lang="sass" scoped>
.cardHeader
  display: flex
  .meta
    a
      color: var(--cyan-heading-color-a)
      text-decoration: none
    h3, p
      margin: 0
    h3
      line-height: 24px
</style>