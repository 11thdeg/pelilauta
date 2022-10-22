<script setup lang="ts">
import { Thread } from '@11thdeg/skaldstore'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchStreamThreads } from '../../composables/useThreads'
import ThreadCard from './ThreadCard.vue'

const props = defineProps<{
  streamkey: string
}>()

const { t } = useI18n()

const recent = ref<Thread[]>([])
const loading = ref(true)
const atEnd = ref(false)

onMounted(async () => {
  recent.value = await fetchStreamThreads(props.streamkey)
  loading.value = false
  watch(props, async () => {
    recent.value = await fetchStreamThreads(props.streamkey)
    loading.value = false
  })
})

async function loadMore() {
  if (loading.value || atEnd.value) return
  loading.value = true
  const more = await fetchStreamThreads(props.streamkey, 11, recent.value.length)
  if (more.length === 0) {
    atEnd.value = true
  } else {
    recent.value = recent.value.concat(more)
  }
  loading.value = false
}


</script>

<template>
  <div class="Column double-cut">
    <cyan-loader
      v-if="loading"
      large
    />
    <ThreadCard
      v-for="thread in recent"
      v-else
      :key="thread.key"
      class="in-stream"
      :threadkey="thread.key"
    />
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        :disabled="loading || atEnd"
        :working="loading"
        :label="t('actions.loadMore')"
        @click="loadMore"
      >
        <cyan-spacer />
      </cyan-button>
    </cyan-toolbar>
  </div>
</template>
  
  <style lang="sass" scoped>
  .in-stream
    margin-bottom: 12px
  .in-stream + .in-stream
    padding-top: 23px
    border-top: 1px solid var(--chroma-secondary-h)
  </style>