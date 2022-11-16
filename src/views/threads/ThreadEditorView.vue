<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/navigation/TopBar.vue'
import ThreadEditorColumn from '../../components/ThreadEditorColumn/ThreadEditorColumn.vue'
import { Thread } from '@11thdeg/skaldstore'

const { t } = useI18n()

</script>

<template>
  <div id="ThreadEditor">
    <TopBar
      :title="t('action.add.thread')"
      sticky
    />
    <main class="bookLayout">
      <ThreadEditorColumn :thread="new Thread()" />
    </main>
  </div>
</template>