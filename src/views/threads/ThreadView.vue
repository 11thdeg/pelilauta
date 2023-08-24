<script lang="ts" setup>
import { computed, toRefs, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ThreadDiscussion from '../../components/discussion/ThreadDiscussion.vue'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import { useThread } from '../../composables/useThread'
import ThreadMenu from './ThreadMenu.vue'
import ShareButton from '../../components/ShareButton/ShareButton.vue'
import ThreadArticle from '../../components/ThreadArticle/ThreadArticle.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import { useTitle } from '@vueuse/core'
import FabTray from '../../components/FabTray/FabTray.vue'
import SiteInfoArticle from '../../components/threads/SiteInfoArticle/SiteInfoArticle.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  flowtime?: string
  threadkey: string
}>()
const { t } = useI18n()
const router = useRouter()
// eslint-disable-next-line vue/no-setup-props-destructure
const { thread, loading, notFound } = useThread(props.threadkey)

const title = computed(() => {
  if (!thread.value) return '...'
  return thread.value.title
})

watch(() => thread.value, (tr) => {
  useTitle().value = 'Pelilauta / ' + tr?.title || '...'
}, { immediate: true })

const { flowtime, threadkey } = toRefs(props)
const flowTimeInt = computed(() => {
  if (!flowtime?.value) return 0
  return parseInt(flowtime.value)
})

</script>

<template>
  <div class="ThreadView">
    <cn-app-bar
      id="TopBar"
      sticky
      :title="title"
      elevation="1"
      @back="() => router.back()"
    >
      <ShareButton />
      <ThreadMenu
        v-if="thread"
        :thread="thread"
      />
    </cn-app-bar>
    <main class="container">
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
            class="column la-large"
          >
            <ThreadArticle
              :thread="thread"
            />
            <ThreadDiscussion
              :flowtime="flowTimeInt"
              :threadkey="threadkey"
            />
          </div>
          <SiteInfoArticle
            :sitekey="thread?.siteid"
            :threadkey="threadkey"
          />
        </template>
      </WithLoader>
    </main>
    <FabTray fast-forward />
  </div>
</template>