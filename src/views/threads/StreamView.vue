<script lang="ts" setup>
import { logDebug } from '../../utils/loghelpers'
import StreamThreadCardList from '../../components/threads/StreamThreadCardList.vue'
import AppBar from '../../components/navigation/AppBar.vue'
import { computed } from 'vue'
import { useMeta } from '../../composables/useMeta'
import StreamTray from '../../components/threads/StreamTray.vue'
import { useI18n } from 'vue-i18n'
    
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

</script>

<template>
  <div id="StreamView">
    <AppBar
      :title="stream.name"
      :noun="stream.icon"
    />
    <main class="bookLayout">
      <StreamThreadCardList :streamkey="streamkey" />
    </main>
    <StreamTray />
  </div>
</template>