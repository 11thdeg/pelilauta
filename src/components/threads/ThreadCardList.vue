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
    <ThreadCard
      v-for="thread in recent"
      v-else
      :key="thread.key"
      class="in-stream"
      :threadkey="thread.key"
    />
  </div>
</template>

<style lang="sass" scoped>
.in-stream
  margin-bottom: 12px
.in-stream + .in-stream
  padding-top: 23px
  border-top: 1px solid var(--chroma-secondary-h)
</style>