<script setup lang="ts">
import { useThreads } from '../../composables/useThreads'
import ThreadCard from './ThreadCard.vue'

const { recent } = useThreads()

</script>

<template>
  <div class="Column double-cut">
    <cyan-loader
      v-if="!recent.length"
      large
    />
    <div class="threadList">
      <ThreadCard
        v-for="thread in recent"
        :key="thread.key"
        class="in-stream"
        :threadkey="thread.key"
      />
    </div>
    <cyan-toolbar class="border-top">
      <cyan-spacer />
      <router-link to="/streams">
        <cyan-button
          text
          noun="discussion"
          :label="$t('action.toDiscussion')"
        />
      </router-link>
      <cyan-spacer />
    </cyan-toolbar>
    <div style="display: flex; justify-content: center; align-items: center;">
      <cyan-icon
        noun="fox"
        style="opacity: 0.37; margin-top: var(--cyan-gap-layout)"
        large
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.threadList
  display: flex
  flex-direction: column
  gap: var(--cyan-column-gap)
.border-top
  border-top: 1px solid var(--cyan-divider-color)
  margin-top: var(--cyan-gap-layout)
</style>