<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/navigation/TopBar.vue'
import ThreadDiscussion from '../../components/discussion/ThreadDiscussion.vue'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import { useThread } from '../../composables/useThread'
import ThreadMenu from './ThreadMenu.vue'
import ShareButton from '../../components/ShareButton/ShareButton.vue'
import ThreadArticle from '../../components/ThreadArticle/ThreadArticle.vue'
import { useSubscriber } from '../../composables/useSession/useSubscriber'
import { logDebug } from '../../utils/logHelpers'
import { useSession } from '../../composables/useSession'
import WithLoader from '../../components/ui/WithLoader.vue'
import { useTitle } from '@vueuse/core'

const props = defineProps<{
  flowtime?: number
  threadkey: string
}>()
const { t } = useI18n()
const { thread, loading, notFound } = useThread(props.threadkey)
const { anonymous } = useSession()
const { subscribeTo, subscriber, setSeen } = useSubscriber()

const title = computed(() => {
  if (!thread.value) return '...'
  return thread.value.title
})

watch(() => thread.value, (tr) => {
  useTitle().value = 'Pelilauta / ' + tr?.title || '...'
  if (anonymous.value) return
  if (tr && tr.key) {
    if(subscriber.value?.shouldNotify(tr.key, tr.flowTime)) {
      logDebug('Notifying of thread changes', tr.key , 'after this point in time')
      logDebug('Current flow time', tr.flowTime)
      logDebug('Current subscription time', subscriber.value?.watches(tr.key))
      subscribeTo(tr.key)
    }
    else if(subscriber.value && !subscriber.value.hasMuted(tr.key)) {
      logDebug('Opened a new thread', tr.key , 'will start notifying of changes')
      subscribeTo(tr.key)
    }
    if (subscriber.value) setSeen(tr.key)
  }
}, { immediate: true })

</script>

<template>
  <div class="ThreadView">
    <TopBar
      :title="title"
      sticky
    >
      <ShareButton />
      <ThreadMenu
        v-if="thread"
        :thread="thread"
      />
    </TopBar>
    <main class="bookLayout">
      <WithLoader :suspended="loading">
        <EmptyCollection
          v-if="notFound"
          :title="t('thread.missing.title')"
          noun="discussion"
          :message="t('thread.missing.message')"
        />
        <template v-else>
          <div
            v-if="thread"
            class="Column large"
          >
            <ThreadArticle
              :thread="thread"
            />
            <ThreadDiscussion
              :flowtime="flowtime"
              :threadkey="threadkey"
            />
          </div>
        </template>
      </WithLoader>
    </main>
  </div>
</template>