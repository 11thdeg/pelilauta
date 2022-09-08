<script setup lang="ts">
import { useThreads } from '../../composables/useThreads'
import ThreadCard from './ThreadCard.vue'

const { recent } = useThreads()
</script>

<template>
  <article class="Column double-cut">
    <ThreadCard
      v-for="thread in recent"
      :key="thread.key"
      :threadkey="thread.key"
    />
  </article>
</template>