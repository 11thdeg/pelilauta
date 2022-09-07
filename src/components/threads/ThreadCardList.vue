<script setup lang="ts">
import { useThreads } from '../../composables/useThreads'
import Card from '../ui/Card.vue'
import MarkdownSection from '../content/MarkdownSection.vue'

const { recent } = useThreads()
</script>

<template>
  <article class="Column">
    <Card v-for="thread in recent" :key="thread.key">
        <cyan-toolbar>
        <h3>{{ thread.title }}</h3>
        </cyan-toolbar>
        <MarkdownSection :content="thread.markdownContent" />
    </Card>
  </article>
</template>