<script lang="ts" setup>
import AppBar from '../../components/navigation/AppBar.vue'
import { computed, onMounted } from 'vue'
import { useMeta } from '../../composables/useMeta'
import StreamTray from '../../components/threads/StreamTray.vue'
import { useI18n } from 'vue-i18n'
import { useTitle } from '@vueuse/core'
import ThreadStreamColumn from '../../components/ThreadStreamColumn/ThreadStreamColumn.vue'
import FabTray from '../../components/FabTray/FabTray.vue'
import CreateThreadFab from '../../components/CreateThreadFab/CreateThreadFab.vue'
import { useSession } from '../../composables/useSession'
import StickyThreadsColumn from '../../components/StickyThreadsColumn/StickyThreadsColumn.vue'
import MarkAllSeenButton from '../../components/MarkAllSeenButton/MarkAllSeenButton.vue'
    
const props = defineProps<{
    streamkey?: string
}>()

const { t } = useI18n()
const { streams } = useMeta()

const stream = computed(() => {
  const topic = streams.value.find(s => s.slug === props.streamkey)
  if (topic) return topic
  return { name: t('streams.title'), icon: 'discussion' }
})

onMounted(() => {
  useTitle().value = t('app.title') + ' / ' + t('streams.title')
})

const { anonymous } = useSession()

</script>

<template>
  <div id="StreamView">
    <AppBar
      :title="stream.name"
      :noun="stream.icon"
    >
      <MarkAllSeenButton />
    </AppBar>
    <main class="bookLayout">
      <ThreadStreamColumn
        :topic="streamkey"
        large
      />
      <StickyThreadsColumn />
    </main>
    <StreamTray />
    <FabTray v-if="!anonymous">
      <CreateThreadFab />
    </FabTray>
  </div>
</template>