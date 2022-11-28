<script setup lang="ts">
import { Thread } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchAuthorThreads } from '../../composables/useThreads'
import ThreadCard from '../ThreadCard/ThreadCard.vue'

const props = defineProps<{
  uid: string
}>()

const { t } = useI18n()

const authorThreads = ref<Thread[]>([])

onMounted(async () => {
  authorThreads.value = await fetchAuthorThreads(props.uid)
})
</script>

<template>
  <article class="Column double">
    <h2>{{ t('profile.stream.title') }}</h2>
    <ThreadCard
      v-for="thread in authorThreads"
      :key="thread.key"
      :threadkey="thread.key"
    />
  </article>
</template>