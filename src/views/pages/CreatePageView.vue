<script lang="ts" setup>
import { toRefs } from 'vue'
import MarkDownCheatSheetColumn from '../../components/content/MarkDownCheatSheetColumn.vue'
import EditPageForm from '../../components/EditPageForm/EditPageForm.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useSite } from '../../composables/useSite'
import { useRouter } from 'vue-router'

const props = defineProps<{
  sitekey: string;
  pagekey?: string;
}>()
const { pagekey } = toRefs(props)

const router = useRouter()

const { canEdit, loading, site } = useSite()
</script>

<template>
  <cn-app-bar 
    modal
    :title="$t('page.create.title')"
    @back="() => router.back()"
  />
  <main class="container">
    <WithLoader :suspended="loading">
      <WithPermission :forbidden="!canEdit">
        <EditPageForm :homepage="site && pagekey === site.key" />
        <MarkDownCheatSheetColumn />
      </WithPermission>
    </WithLoader>
  </main>
</template>