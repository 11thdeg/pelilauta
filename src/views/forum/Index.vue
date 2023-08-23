<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import ShareButton from '../../components/ShareButton/ShareButton.vue'
import ForumIndex from '../../components/forum/forumindex/ForumIndex.vue'
import { onMounted } from 'vue';
import { useTitle } from '../../composables/useTitle';
import { logEvent } from '../../utils/logHelpers';

const { t } = useI18n()
const { title } = useTitle()

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
</template>
