<script lang="ts" setup>
import { Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMeta, StreamData } from '../../composables/useMeta'
import { logDebug } from '../../utils/logHelpers'
import TopicEditor from './TopicEditor.vue'

const { t } = useI18n()

const { streams, saveStreams } = useMeta()

async function moveUp(index: number) {
  if (index === 0) return
  const arr = streams.value
  const temp = arr[index - 1]
  arr[index -1 ] = arr[index]
  arr[index] = temp
  await saveStreams(arr)
}

const activeTopic:Ref<StreamData|undefined> = ref(undefined) 

function saveTopic(s: StreamData) {
  logDebug('addTopic', s)
  if (streams.value.find(thr => thr.slug === s.slug)) {
    // update
    const arr = streams.value
    saveStreams(arr)
  } else {
    if (!s.name) throw new Error('Topic name is required')
    if (!s.slug) s.slug = s.name.toLowerCase()
    if (!s.icon) s.icon = 'discussion'
    if (!s.order) s.order = -1
    if (!s.count) s.count = 0
    if (!s.description) s.description = ''
    const arr = streams.value
    arr.push(s)
    logDebug('add', arr)
    saveStreams(arr)
  }
  activeTopic.value = undefined
}

</script>

<template>
  <div class="Column">
    <h3>{{ t('meta.field.streams') }}</h3>
    <p class="TypeBody2">
      {{ t('admin.topictool.info') }}
    </p>
    <div
      v-for="stream in streams"
      :key="stream.slug"
      class="sortableTable"
    >
      <cyan-icon
        :noun="stream.icon"
        small
      />
      <p>
        {{ stream.name }} ({{ stream.count }})
      </p>
      <cyan-button
        noun="chevron-up"
        text
        :disabled="stream.order === 0"
        @click="moveUp"
      />
      <cyan-button
        noun="edit"
        text
        @click="activeTopic = stream"
      />
    </div>
    <TopicEditor
      :topic="activeTopic"
      @save="saveTopic($event as StreamData)"
    />
  </div>
</template>

<style lang="sass">
.sortableTable
  display: grid
  grid-template-columns: 32px auto 32px 32px
  row-gap: 12px
  grid-row-gap: 12px
  align-items: center
  p
    margin: 0
    padding: 0
</style>