<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/ui/TopBar.vue'
import MarkDownCheatSheetColumn from '../../components/content/MarkDownCheatSheetColumn.vue'
import { useSites } from '../../composables/useSites'
import { onMounted, ref } from 'vue'
import { Site } from '@11thdeg/skaldstore'
import EditPageForm from '../../components/pages/EditPageForm.vue'

const props = defineProps<{
  sitekey: string
  pagekey?: string
}>()

const { t } = useI18n()
const { fetchSite } = useSites()
const site = ref(new Site())

onMounted(async () => {
  site.value = await fetchSite(props.sitekey) || new Site()
})

</script>

<template>
  <div class="EditPageView">
    <TopBar :title="t('pages.edit.title')" />
    <main class="bookLayout">
      <EditPageForm
        v-if="site.key"
        :sitekey="sitekey"
        :pagekey="pagekey"
      />
      <MarkDownCheatSheetColumn />
    </main>
  </div>
</template>