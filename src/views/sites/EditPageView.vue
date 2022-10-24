<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/ui/TopBar.vue'
import MarkDownCheatSheetColumn from '../../components/content/MarkDownCheatSheetColumn.vue'
import EditPageForm from '../../components/pages/EditPageForm.vue'
import { loadPage } from '../../composables/usePage'
import { loadSite } from '../../composables/useSite'
import { watch } from 'vue'

const props = defineProps<{
  sitekey: string
  pagekey?: string
}>()

const { t } = useI18n()

// We need to load state from the server when the route changes
watch(props, () => {
  // init composable
  loadSite(props.sitekey)
  // init composable with sitekey and pagekey
  loadPage(props.pagekey || '', props.sitekey)
}, { 
  immediate: true 
})

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