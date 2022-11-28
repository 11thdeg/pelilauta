<script setup lang="ts">
import { Thread } from '@11thdeg/skaldstore'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchStreamThreads, useThreads } from '../../composables/useThreads'
import ThreadCard from '../ThreadCard/ThreadCard.vue'

const props = defineProps<{
  streamkey?: string
}>()

const { t } = useI18n()

const recent = ref<Thread[]>([])
const loading = ref(true)
const atEnd = ref(false)

onMounted(async () => {
  watch(props, async () => {
    loading.value = true
    if (props.streamkey) recent.value = await fetchStreamThreads(props.streamkey)
    else recent.value = useThreads().recent.value
    loading.value = false
    atEnd.value = false
  }, 
  { immediate: true })
})

async function loadMore() {
  if (loading.value || atEnd.value || !props.streamkey) return
  const more = await fetchStreamThreads(props.streamkey, 11, true)
  if (more.length === 0) {
    atEnd.value = true
  } else {
    atEnd.value = false
    recent.value = recent.value.concat(more)
  }
}


</script>

<template>
  <article class="Column double-cut">
    <section class="cardList">
      <ThreadCard
        v-for="thread in recent"
        :key="thread.key"
        class="in-stream"
        :threadkey="thread.key"
      />
    </section>
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        :disabled="loading || atEnd || !streamkey"
        :working="loading"
        :label="t('action.loadMore')"
        noun="discussion"
        @click="loadMore"
      >
        <cyan-spacer />
      </cyan-button>
    </cyan-toolbar>
  </article>
</template>

<style lang="sass" scoped>
.cardList
  display: flex
  flex-direction: column
  gap: var(--cyan-column-gap)
</style>