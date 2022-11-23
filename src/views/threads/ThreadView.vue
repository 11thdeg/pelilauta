<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/navigation/TopBar.vue'
import ThreadDiscussion from '../../components/discussion/ThreadDiscussion.vue'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import { useThread } from '../../composables/useThread'
import ThreadMenu from './ThreadMenu.vue'
import ShareButton from '../../components/ShareButton/ShareButton.vue'
import { useScreenSize } from '../../composables/useScreenSize'
import ThreadArticle from '../../components/ThreadArticle/ThreadArticle.vue'
import { useSubscriber } from '../../composables/useSession/useSubscriber'
import { logDebug } from '../../utils/logHelpers'
import { useSession } from '../../composables/useSession'

const props = defineProps<{
  threadkey: string
}>()
const { t } = useI18n()
const { thread, loading, notFound } = useThread(props.threadkey)
const { anonymous } = useSession()
const { subscribeTo, subscriber } = useSubscriber()

const title = computed(() => {
  if (!thread.value) return '...'
  return thread.value.title
})

const { isLarge } = useScreenSize()

watch(() => thread.value, (tr) => {
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
            class="Column"
            :class="{
              double: isLarge,
              'double-cut': !isLarge
            }"
          >
            <ThreadArticle
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