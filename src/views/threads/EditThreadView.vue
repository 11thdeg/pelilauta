<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { onMounted, Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MarkDownCheatSheetColumn from '../../components/content/MarkDownCheatSheetColumn.vue'
import ThreadEditorColumn from '../../components/ThreadEditorColumn/ThreadEditorColumn.vue'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import { fetchThread } from '../../composables/useThreads'
import StickyToggle from './StickyToggle.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  threadkey: string
}>()

const { t } = useI18n()
const router = useRouter()

const loading = ref(true)
const thread:Ref<Thread|undefined> = ref(undefined)

onMounted(async () => {
  const tr = await fetchThread(props.threadkey)
  if (tr) {
    thread.value = tr
  }
  loading.value = false
})

</script>
<template>
  <cyan-top-app-bar
    id="TopBar"
    modal
    @back="() => router.back()"
  >
    <h3>{{ t('thread.edit.title') }} {{ thread?.title }}</h3>
    <cyan-spacer />
    <StickyToggle />
  </cyan-top-app-bar>
  <main class="bookLayout">
    <WithLoader :suspended="loading">
      <ThreadEditorColumn
        v-if="thread"
        :thread="thread"
      />
      <EmptyCollection
        v-else
        :title="t('thread.missing.title')"
        noun="discussion"
      />
    </WithLoader>
  </main>
  <div class="bookLayout">
    <MarkDownCheatSheetColumn />
  </div>
</template>