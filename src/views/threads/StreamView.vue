<script lang="ts" setup>
import { logDebug } from '../../utils/loghelpers'
import StreamThreadCardList from '../../components/threads/StreamThreadCardList.vue'
import AppBar from '../../components/ui/AppBar.vue'
import { computed } from 'vue'
import { useMeta } from '../../composables/useMeta'
    
const props = defineProps<{
    streamkey: string
}>()

logDebug('Streamview', props.streamkey)

const { streams } = useMeta()

const stream = computed(() => {
  const t = streams.value.find(s => s.slug === props.streamkey)
  if (t) return t
  return { name: '---', icon: 'discussion' }
})

</script>

<template>
  <AppBar
    :title="stream.name"
    :noun="stream.icon"
  />
  <main class="bookLayout">
    <StreamThreadCardList :streamkey="streamkey" />
  </main>
</template>