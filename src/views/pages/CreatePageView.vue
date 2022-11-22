<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import MarkDownCheatSheetColumn from '../../components/content/MarkDownCheatSheetColumn.vue'
import TopBar from '../../components/navigation/TopBar.vue'
import EditPageForm from '../../components/pages/EditPageForm.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useSite } from '../../composables/useSite'

const props = defineProps<{
  sitekey: string;
  pagekey?: string;
}>()

const { t } = useI18n()

const { canEdit, loading, site } = useSite(props.sitekey)
</script>

<template>
  <TopBar :title="t('page.create.title')" />
  <main class="bookLayout">
    <WithLoader :suspended="loading">
      <WithPermission :forbidden="!canEdit">
        <EditPageForm :homepage="site && pagekey === site.key" />
        <MarkDownCheatSheetColumn />
      </WithPermission>
    </WithLoader>
  </main>
</template>