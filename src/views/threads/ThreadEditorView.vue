<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/ui/TopBar.vue'
import ThreadEditor from '../../components/threads/editor/ThreadEditor.vue'
import ThreadEditorGuide from '../../components/threads/editor/ThreadEditorGuide.vue'

const { t } = useI18n()

</script>

<template>
  <div id="ThreadEditor">
    <TopBar
      :title="t('action.add.thread')"
      sticky
    />
    <main class="bookLayout">
      <ThreadEditor />
      <ThreadEditorGuide />
    </main>
  </div>
</template>