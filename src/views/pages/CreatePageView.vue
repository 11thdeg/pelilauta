<script lang="ts" setup>
import MarkDownCheatSheetColumn from '../../components/content/MarkDownCheatSheetColumn.vue'
import EditPageForm from '../../components/pages/EditPageForm.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useSite } from '../../composables/useSite'
import { useRouter } from 'vue-router'

const props = defineProps<{
  sitekey: string;
  pagekey?: string;
}>()

const router = useRouter()

const { canEdit, loading, site } = useSite(props.sitekey)
</script>

<template>
  <cyan-top-app-bar 
    sticky
    modal
    @back="() => router.back()"
  >
    <h3>{{ $t('page.create.title') }}</h3>
  </cyan-top-app-bar>
  <main class="bookLayout">
    <WithLoader :suspended="loading">
      <WithPermission :forbidden="!canEdit">
        <EditPageForm :homepage="site && pagekey === site.key" />
        <MarkDownCheatSheetColumn />
      </WithPermission>
    </WithLoader>
  </main>
</template>