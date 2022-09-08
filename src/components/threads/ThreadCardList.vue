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
      :threadkey="thread.key"
    />
  </div>
</template>