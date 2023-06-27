<script lang="ts" setup>
import AssetListColumn from '../../components/assets/AssetListColumn.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useSession } from '../../composables/useSession'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTitle } from '@vueuse/core'
import WithLoader from '../../components/ui/WithLoader.vue'
import LibraryNavigationTray from '../../components/library/LibraryNavigationTray/LibraryNavigationTray.vue'

const { anonymous, active } = useSession()
const { t } = useI18n()

onMounted(() => {
  useTitle().value = t('app.title') + ' / ' + t('assets.title')
})
    
</script>
<template>
  <cn-app-bar :title="$t('assets.title')" />
  <WithLoader
    large
    :suspended="!active"
  >
    <main class="bookLayout">
      <WithPermission :forbidden="anonymous">
        <LibraryNavigationTray />
        <AssetListColumn />
      </WithPermission>
    </main>
  </WithLoader>
</template>