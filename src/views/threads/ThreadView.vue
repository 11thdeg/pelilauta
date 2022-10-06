<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/ui/TopBar.vue'
import ThreadPane from '../../components/threads/ThreadPane.vue'
import ThreadDiscussion from '../../components/discussion/ThreadDiscussion.vue'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import { useThread } from '../../composables/useThread'

const props = defineProps<{
  threadkey: string
}>()
const { t } = useI18n()
const { thread, loading, notFound } = useThread(props.threadkey)

const title = computed(() => {
  if (!thread.value) return '...'
  return thread.value.title
})
</script>

<template>
  <div class="ThreadView">
    <TopBar
      :title="title"
      sticky
    />
    <main class="bookLayout">
      <div v-if="loading">
        <cyan-loader large />
      </div>
      <template v-else>
        <EmptyCollection
          v-if="notFound"
          :title="t('thread.missing.title')"
          noun="discussion"
          :message="t('thread.missing.message')"
        />
        <template v-else>
          <div
            v-if="thread"
            class="Column double"
          >
            <ThreadPane
              :thread="thread"
            />
            <ThreadDiscussion
              :threadkey="threadkey"
            />
          </div>
        </template>
      </template>
    </main>
  </div>
</template>