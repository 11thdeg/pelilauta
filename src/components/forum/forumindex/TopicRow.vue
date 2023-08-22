<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMeta } from '../../../composables/useMeta'

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
</script>

<template>
  <div class="TopicRow hoverable">
    <cyan-icon :noun="noun" />
    <p>{{ name }}</p>
    <p>{{ count }}</p>
  </div>
</template>

<style lang="sass" scoped>
.TopicRow
  display: grid
  grid-template-columns: 64px 4fr 1fr 1fr
  padding: 0 12px
  border-radius: 8px
</style>