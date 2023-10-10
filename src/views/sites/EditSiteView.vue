<script lang="ts" setup>
import { onMounted } from 'vue'
import ChapterTool from '../../components/site/settings/ChapterTool.vue'
import { useSite } from '../../composables/useSite'
import ThemeEditor from '../../components/site/settings/ThemeEditor.vue'
import LinksTool from '../../components/sites/tools/LinksTool.vue'
import SiteMetaTool from '../../components/SiteMetaEditorCard/SiteMetaTool.vue'
import { useI18n } from 'vue-i18n'
import { useTitle } from '@vueuse/core'
import SiteFooter from '../../components/SiteFooter/SiteFooter.vue'
import { useRouter } from 'vue-router'
import WithPermission from '../../components/ui/WithPermission.vue'
import WithLoader from '../../components/ui/WithLoader.vue'


const router = useRouter()
const { site, loading, canEdit } = useSite()
const { t } = useI18n()

onMounted(async () => {
  useTitle(t('site.settings.title') + ' - ' + site.value.name)
})
</script>

<template>
  <div id="EditSiteView">
    <cn-app-bar 
      noun="adventurer"
      :title="t('site.settings.title')"
      modal
      @back="router.push('/sites/' + site.key)"
    />
    <WithLoader :suspended="loading">
      <WithPermission :forbidden="!canEdit">
        <main class="dashboardLayout">
          <ThemeEditor />
          <SiteMetaTool />
          <ChapterTool />
          <LinksTool />
        </main>
      </WithPermission>
    </WithLoader>
    <SiteFooter />
  </div>
</template>