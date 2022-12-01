<script setup lang="ts">
import { Thread } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchAuthorThreads } from '../../composables/useThreads'
import ThreadCard from '../ThreadCard/ThreadCard.vue'
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
      <section class="verticalList">
        <ThreadCard
          v-for="thread in authorThreads"
          :key="thread.key"
          :threadkey="thread.key"
        />
      </section>
    </WithLoader>
  </article>
</template>