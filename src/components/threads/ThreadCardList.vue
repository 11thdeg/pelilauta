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
    <hr>
    <cyan-toolbar>
      <cyan-spacer />
      <router-link to="/threads">
        <cyan-button
          text
          noun="discussion"
          :label="$t('action.toDiscussion')"
        />
      </router-link>
      <cyan-spacer />
    </cyan-toolbar>
  </div>
</template>

<style lang="sass" scoped>
.threadList
  display: flex
  flex-direction: column
  gap: var(--cyan-column-gap)
</style>