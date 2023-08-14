<script lang="ts" setup>
/*
 * As a mental reminder for myself – this code was extracted from the useThreads – as it made little
 * sense to DRY the code just because of DRY. 
 * 
 * This component loads a stream of cards (for a given topic, if any), Subscribes to the top 7, and fetches more
 * when the user clicks on the "Load More" button.
 * 
 * REFACTOR: This component was a bit large, so I extracted the ./useThreads hook, and the ThreadStreamCard component.
 */

import { computed, onUnmounted,  onMounted, watch } from 'vue'
import ThreadStreamCard from './ThreadStreamCard.vue'
import { useThreads } from './useThreads';


const props = defineProps<{
  topic?: string
  large?: boolean
}>()

const { threads, sub, unsub, loadMore, atEnd, loading } = useThreads()

onMounted(() => {
  watch(() => props.topic, (t) => {
    unsub()
    sub(t)
  }, { immediate: true })
})

onUnmounted(() => {
  unsub()
})

const nonStickyThreads = computed(() => threads.value.filter((thread) => !thread.sticky))
</script>

<template>
  <article
    class="Column"
    :class="{ large: large }"
  >
    <cyan-loader
      v-if="loading"
      large
    />
    <div class="flex flex-column">
      <ThreadStreamCard
        v-for="thread in nonStickyThreads"
        :key="thread.key"
        :thread="thread"
      />
    </div>
    <hr>
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        secondary
        :disabled="atEnd"
        noun="discussion"
        :label="$t('action.toDiscussion')"
        @click="loadMore"
      />
      <cyan-spacer />
    </cyan-toolbar>
  </article>
</template>