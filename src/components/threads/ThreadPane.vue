<script lang="ts" setup>
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
    <!-- header -->
    <cyan-toolbar class="separator">
      <h2>{{ thread.title }}</h2>
      <cyan-spacer />
      <ShareButton />
      <ThreadMenu
        v-if="fromMe || admin"
        :thread="thread"
      />
    </cyan-toolbar>
    
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
      <LoveAThreadButton
        :thread="thread"
      />
    </cyan-toolbar>
    <ProfilePane :uid="thread.author" />
  </article>
</template>

<style lang="sass" scoped>
.separator
  border-bottom: 1px solid var(--cyan-divider-color)
  padding-bottom: 3px
  margin-bottom: 32px
</style>