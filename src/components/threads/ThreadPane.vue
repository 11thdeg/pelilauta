<script lang="ts" setup>
import MarkdownSection from '../content/MarkdownSection.vue'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import LoveAThreadButton from './LoveAThreadButton.vue'
import { useSession } from '../../composables/useSession'
import ProfilePane from '../profiles/ProfilePane.vue'
import WatchButton from '../actions/WatchButton.vue'
import { computed } from 'vue'

const props = defineProps<{
  thread: {
    key?: string,
    title: string,
    author: string,
    flowTime: number,
    markdownContent: string,
    htmlContent: string,
    lovedCount: number,
    followerCount: number,
    hasOwner: (uid: string) => boolean
  }
}>()

const { anonymous, uid } = useSession()

const fromMe = computed(() => props.thread.hasOwner(uid.value || ''))

</script>

<template>
  <article class="ThreadPane">
    <h1>{{ thread.title }}</h1>
    
    <!-- content -->
    <MarkdownSection
      v-if="thread.markdownContent"
      :content="thread.markdownContent"
    />
    <div
      v-else
      :innerHTML="thread.htmlContent"
    />

    <!-- footer -->
    <cyan-toolbar>
      <FlowTimeCaption :flow-time="thread.flowTime" />
      <cyan-spacer />
      <WatchButton
        v-if="!anonymous"
        :entry="thread"
      />
      <LoveAThreadButton
        :thread="thread"
      />
    </cyan-toolbar>
    <ProfilePane
      v-if="!fromMe"
      :uid="thread.author"
    />
  </article>
</template>

<style lang="sass" scoped>
.separator
  border-bottom: 1px solid var(--cyan-divider-color)
  padding-bottom: 3px
  margin-bottom: 32px
</style>