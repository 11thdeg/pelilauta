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

// eslint-disable-next-line vue/no-setup-props-destructure
const { canEdit, loading, site } = useSite(props.sitekey)
</script>

<template>
  <cn-app-bar 
    modal
    :title="$t('page.create.title')"
    @back="() => router.back()"
  />
  <main class="bookLayout">
    <WithLoader :suspended="loading">
      <WithPermission :forbidden="!canEdit">
        <EditPageForm :homepage="site && pagekey === site.key" />
        <MarkDownCheatSheetColumn />
      </WithPermission>
    </WithLoader>
  </main>
</template>