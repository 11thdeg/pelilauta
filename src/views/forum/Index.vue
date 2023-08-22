<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import ShareButton from '../../components/ShareButton/ShareButton.vue'
import ForumIndex from '../../components/forum/forumindex/ForumIndex.vue'

const { t } = useI18n()
</script>

<template>
  <!-- For the App front page, we use the app-bar defaults! -->
  <cn-app-bar
    noun="discussion"
    :title="t('forum.title')"
  >
    <ShareButton />
  </cn-app-bar>
  <main class="container">
    <ForumIndex />
  </main>
</template>
