<script setup lang="ts">
import { useThreads } from '../../composables/useThreads'
import ThreadCard from '../ThreadCard/ThreadCard.vue'
import WithLoader from '../ui/WithLoader.vue'

const { recent, loading } = useThreads()

</script>

<template>
  <article class="Column">
    <WithLoader :suspended="loading">
      <section class="flex flex-column">
        <ThreadCard
          v-for="thread in recent"
          :key="thread.key"
          class="in-stream"
          :threadkey="thread.key"
        />
      </section>
    </WithLoader>
    <hr>
    <cyan-toolbar>
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
  </article>
</template>