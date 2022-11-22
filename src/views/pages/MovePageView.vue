<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import MovePageTool from '../../components/MovePageTool.vue'
import TopBar from '../../components/navigation/TopBar.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { usePage } from '../../composables/usePage'
import { useSite } from '../../composables/useSite'

const props = defineProps<{
  sitekey: string;
  pagekey: string;
}>()

const { t } = useI18n()

const { canEdit } = useSite(props.sitekey)
const { loading } = usePage(props.pagekey, props.sitekey)

</script>

<template>
  <div id="MovePageView">
    <TopBar :title="t('page.move.title')" />
    <main class="bookLayout">
      <WithLoader :suspended="loading">
        <WithPermission :forbidden="!canEdit">
          <MovePageTool
            :sitekey="props.sitekey"
            :pagekey="props.pagekey"
          />
        </WithPermission>
      </WithLoader>
    </main>
  </div>
</template>
