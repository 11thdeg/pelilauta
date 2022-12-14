<script lang="ts" setup>
import AppBar from '../components/navigation/AppBar.vue'
import AssetListColumn from '../components/assets/AssetListColumn.vue'
import WithPermission from '../components/ui/WithPermission.vue'
import { useSession } from '../composables/useSession'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTitle } from '@vueuse/core'

const { anonymous } = useSession()
const { t } = useI18n()

onMounted(() => {
  useTitle().value = t('app.title') + ' / ' + t('assets.title')
})
    
</script>
<template>
  <AppBar />
  <main class="bookLayout">
    <WithPermission :forbidden="anonymous">
      <AssetListColumn />
    </WithPermission>
  </main>
</template>