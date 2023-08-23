<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMeta } from '../../../composables/useMeta'
import LatestPost from './LatestPost.vue'

const { t } = useI18n()

const props = defineProps<{
  topic: string
}>()

const { streams } = useMeta()

const streamInfo = computed(() => {
  return streams.value.find((stream) => stream.slug === props.topic)
})

const name = computed(() => {
  return streamInfo.value?.name || t('forum.index.topic-not-found')
})

const count = computed(() => {
  return streamInfo.value?.count || 0
})

const noun = computed(() => {
  return streamInfo.value?.icon || 'forum'
})

const description = computed(() => {
  return streamInfo.value?.description || ''
})
</script>

<template>
  <div class="TopicRow hoverable">
    <cyan-icon 
      :noun="noun" 
      style="margin-top: 8px"
    />
    <p 
      style="margin-top: 8px"
    >
      <router-link
        :to="`/streams/${props.topic}`"
      >
        {{ name }}
      </router-link><br>
      <span class="TypeCaption">{{ description }}</span>
    </p>
    <p>{{ count }}</p>
    <LatestPost :topic="props.topic" />
  </div>
</template>

<style lang="sass" scoped>
.TopicRow
  display: grid
  grid-template-columns: 64px 35% 1fr 50%
  padding: 0 12px
  border-radius: 8px
  margin-bottom: 12px
  border: solid 1px var(--chroma-secondary-b)
</style>