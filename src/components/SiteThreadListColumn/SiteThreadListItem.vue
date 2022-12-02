<script lang="ts" setup>
import { computed } from 'vue'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import ProfileLink from '../profileLink/ProfileLink.vue'
import TopicIcon from '../threads/TopicIcon.vue'

const props = defineProps<{
  thread: {
    key?: string,
    title: string,
    topicid?: string,
    flowTime: number,
    author: string
  }
}>()

const threadkey = computed(() => props.thread.key || '')
</script>

<template>
  <li>
    <router-link :to="`/threads/${threadkey}`">
      <TopicIcon :slug="thread.topicid || 'fox'" />
      <div>
        <h4 class="downscaled">
          {{ thread.title }}
        </h4>
        <div style="display: flex">
          <ProfileLink :uid="thread.author" />
          <cyan-spacer />
          <FlowTimeCaption :flow-time="thread.flowTime" />
        </div>
      </div>
    </router-link>
  </li>
</template>

<style lang="sass" scoped>
li
  list-style: none
  margin: 0
  padding: 0
  a
    display: flex
    gap: 8px
    h4
      margin: 0
li + li
  margin-top: 16px
  // border-top: 1px solid var(--chroma-primary-a)
  //padding-top: 3px
</style>