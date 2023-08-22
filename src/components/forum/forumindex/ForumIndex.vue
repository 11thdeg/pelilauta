<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TopicRow from './TopicRow.vue'
import { useMeta } from '../../../composables/useMeta'

const { t } = useI18n()

const { streams } = useMeta()
</script>

<template>
  <article class="column la-large">
    <section class="flex">
      <h2 class="downscaled">
        {{ 
          t('forum.index.title') 
        }}
      </h2>
    </section>
    <section>
      <TopicRow
        v-for="topic in streams"
        :key="topic.slug"
        :topic="topic.slug"
      />
    </section>
  </article>
</template>