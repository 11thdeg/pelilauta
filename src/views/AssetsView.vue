<script lang="ts" setup>
import AppBar from '../components/navigation/AppBar.vue'
import AssetListColumn from '../components/assets/AssetListColumn.vue'
import WithPermission from '../components/ui/WithPermission.vue'
import { useSession } from '../composables/useSession'

const { anonymous } = useSession()
    
</script>
<template>
  <AppBar />
  <main class="bookLayout">
    <WithPermission :forbidden="anonymous">
      <AssetListColumn />
    </WithPermission>
  </main>
</template>