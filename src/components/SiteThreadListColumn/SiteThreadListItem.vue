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
    <router-link
      :to="`/threads/${threadkey}`"
      class="hoverable clickable"
    >
      <TopicIcon
        :slug="thread.topicid || 'fox'"
        small
      />
      <div>
        <p class="no-margin">
          {{ thread.title }}
        </p>
        <div class="flex">
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
  width: 100%
  display: block
  a
    width: 100%
    padding: 4px
    display: flex
    gap: 8px
    p.no-margin
      margin: 0
</style>