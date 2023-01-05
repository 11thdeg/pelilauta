<script lang="ts" setup>
import { logDebug } from '../../utils/loghelpers'
import AppBar from '../../components/navigation/AppBar.vue'
import { computed, onMounted } from 'vue'
import { useMeta } from '../../composables/useMeta'
import StreamTray from '../../components/threads/StreamTray.vue'
import { useI18n } from 'vue-i18n'
import { useTitle } from '@vueuse/core'
import ThreadStreamColumn from '../../components/ThreadStreamColumn/ThreadStreamColumn.vue'
    
const props = defineProps<{
    streamkey?: string
}>()

logDebug('Streamview', props.streamkey)

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

</script>

<template>
  <div id="StreamView">
    <AppBar
      :title="stream.name"
      :noun="stream.icon"
    />
    <main class="bookLayout">
      <ThreadStreamColumn
        :topic="streamkey"
        large
      />
    </main>
    <StreamTray />
  </div>
</template>