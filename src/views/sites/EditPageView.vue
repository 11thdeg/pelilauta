<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/ui/TopBar.vue'
import MarkDownCheatSheetColumn from '../../components/content/MarkDownCheatSheetColumn.vue'
import EditPageForm from '../../components/pages/EditPageForm.vue'
import { usePage } from '../../composables/usePage'

const props = defineProps<{
  sitekey: string
  pagekey?: string
}>()

const { t } = useI18n()

// init composable with sitekey and pagekey
usePage(props.pagekey, props.sitekey)

</script>

<template>
  <div class="EditPageView">
    <TopBar :title="t('pages.edit.title')" />
    <main class="bookLayout">
      <EditPageForm />
      <MarkDownCheatSheetColumn />
    </main>
  </div>
</template>