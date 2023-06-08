<script setup lang="ts">
import { Thread } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchAuthorThreads } from '../../composables/useThreads'
import ThreadStreamCard from '../ThreadStreamColumn/ThreadStreamCard.vue'
import WithLoader from '../ui/WithLoader.vue'

const props = defineProps<{
  uid: string
}>()

const { t } = useI18n()

const authorThreads = ref<Thread[]>([])
const loading = ref(true)

onMounted(async () => {
  authorThreads.value = await fetchAuthorThreads(props.uid)
  loading.value = false
})
</script>

<template>
  <article class="Column">
    <h3>{{ t('profile.stream.title') }}</h3>
    <WithLoader :suspended="loading">
      <section class="flex flex-column">
        <ThreadStreamCard
          v-for="thread in authorThreads"
          :key="thread.key"
          :thread="thread"
        />
      </section>
    </WithLoader>
  </article>
</template>