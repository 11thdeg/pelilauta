<script lang="ts" setup>
import ProfileTag from '../profiles/ProfileTag.vue'
import MarkdownSection from '../content/MarkdownSection.vue'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import LoveAThreadButton from './LoveAThreadButton.vue'
import ShareButton from '../actions/ShareButton.vue'
import { useSession } from '../../composables/useSession'
import { computed } from 'vue'
import ThreadMenu from '../../views/threads/ThreadMenu.vue'
import ProfilePane from '../profiles/ProfilePane.vue'

const props = defineProps<{
  thread: {
    key?: string,
    title: string,
    author: string,
    flowTime: number,
    markdownContent: string,
    htmlContent: string,
    lovedCount: number,
    hasOwner: (uid: string) => boolean
  }
}>()

const { uid, admin } = useSession()

const fromMe = computed(() => props.thread.hasOwner(uid.value || ''))

</script>

<template>
  <article class="ThreadPane">
    <h1>{{ thread.title }}</h1>
    <cyan-toolbar>
      <ProfileTag :uid="thread.author" />
      <cyan-spacer />
      <FlowTimeCaption :flow-time="thread.flowTime" />
      <ShareButton />
      <ThreadMenu
        v-if="fromMe || admin"
        :thread="thread"
      />
    </cyan-toolbar>
    <MarkdownSection
      v-if="thread.markdownContent"
      :content="thread.markdownContent"
    />
    <div
      v-else
      :innerHTML="thread.htmlContent"
    />
    <ProfilePane :uid="thread.author" />
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-icon
        noun="eye"
        xsmall
      />
      <LoveAThreadButton
        :thread="thread"
      />
    </cyan-toolbar>
  </article>
</template>