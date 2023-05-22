<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/navigation/TopBar.vue'
import MarkDownCheatSheetColumn from '../../components/content/MarkDownCheatSheetColumn.vue'
import EditPageForm from '../../components/pages/EditPageForm.vue'
import { usePage } from '../../composables/usePage'
import { loadSite, useSite } from '../../composables/useSite'
import { watch } from 'vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  sitekey: string
  pagekey?: string
}>()

const router = useRouter()

const { t } = useI18n()

// We need to load state from the server when the route changes
watch(props, () => {
  // init composable
  loadSite(props.sitekey)
  // init composable with sitekey and pagekey
  usePage(props.pagekey || '', props.sitekey)
}, { 
  immediate: true 
})

const { loading } = usePage()
const { canEdit } = useSite()

</script>

<template>
  <div class="EditPageView">
    <TopBar :title="t('pages.edit.title')">
      <template v-if="canEdit">
        <cyan-menu>
          <cyan-menu-item
            noun="arrow-right"
            @click="router.push(`/sites/${props.sitekey}/pages/${props.pagekey}/move`)"
          >
            {{ t('action.move') }}
          </cyan-menu-item>
          <cyan-menu-item
            noun="trashcan"
            @click="router.push(`/sites/${props.sitekey}/pages/${props.pagekey}/delete`)"
          >
            {{ t('page.deleteConfirm.title') }}
          </cyan-menu-item>
        </cyan-menu>
      </template>
    </TopBar>
    <main class="bookLayout">
      <WithLoader :suspended="loading">
        <WithPermission :forbidden="!canEdit">
          <EditPageForm :pagekey="pagekey" />
          <MarkDownCheatSheetColumn />
        </WithPermission>
      </WithLoader>
    </main>
  </div>
</template>