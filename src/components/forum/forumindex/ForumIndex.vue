<script setup lang="ts">
import TopicRow from './TopicRow.vue'
import { useMeta } from '../../../composables/useMeta'
import ForumIndexHeader from './ForumIndexHeader.vue'

const { streams } = useMeta()
</script>

<template>
  <article class="column la-large">
    <ForumIndexHeader />
    <section class="TopicTable">
      <TopicRow
        v-for="topic in streams"
        :key="topic.slug"
        :topic="topic.slug"
      />
    </section>
  </article>
</template>
