<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import ShareButton from '../../components/ShareButton/ShareButton.vue'
import ForumIndex from '../../components/forum/forumindex/ForumIndex.vue'
import { onMounted } from 'vue'
import { useTitle } from '../../composables/useTitle'
import { logEvent } from '../../utils/logHelpers'
import { useSession } from '../../composables/useSession'
import FabTray from '../../components/FabTray/FabTray.vue'

const { t } = useI18n()
const { title } = useTitle()
const { anonymous } = useSession()

onMounted(() => {
  title.value = '⚀ / Foorumit'
  logEvent('pageview [conversion] / forum')
})
</script>

<template>
  <!-- For the App front page, we use the app-bar defaults! -->
  <cn-app-bar
    noun="discussion"
    :title="t('forum.title')"
  >
    <ShareButton />
  </cn-app-bar>
  <main class="singleColumnLayout">
    <ForumIndex />
  </main>
  <FabTray v-if="!anonymous">
    <router-link to="/add/thread">
      <cyan-fab
        noun="add"
        :label="t('action.add.thread')"
      />
    </router-link>
  </FabTray>
</template>
