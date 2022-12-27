<script lang="ts" setup>
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
  <cyan-top-app-bar
    :noun="$t('assets.noun')"
    sticky
    modal
    @back="$router.back()"
  >
    <h3>{{ $t('assets.title') }}</h3>
  </cyan-top-app-bar>
  <main class="bookLayout">
    <WithPermission :forbidden="anonymous">
      <AssetListColumn />
    </WithPermission>
  </main>
</template>