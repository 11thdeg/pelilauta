<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/ui/TopBar.vue'
import ThreadEditor from '../../components/threads/editor/ThreadEditor.vue'
import MarkDownCheatSheetColumn from '../../components/content/MarkDownCheatSheetColumn.vue'

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
      <MarkDownCheatSheetColumn />
    </main>
  </div>
</template>