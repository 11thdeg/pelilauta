<script setup lang="ts">
import AssetEntryColumn from '../../components/assets/AssetEntryColumn.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import AssetTopBar from '../../components/AssetTopBar/AssetTopBar.vue'
import { useAsset } from '../../composables/useAsset'
import AssetPreviewColumn from '../../components/AssetPreviewColumn/AssetPreviewColumn.vue'

const props = defineProps<{
  assetkey: string
}>()

// eslint-disable-next-line vue/no-setup-props-destructure
const { asset, loading } = useAsset(props.assetkey)

</script>

<template>
  <div id="AssetView">
    <AssetTopBar :asset-key="props.assetkey" />
    <main class="bookLayout">
      <WithLoader :suspended="loading">
        <template v-if="asset">
          <AssetPreviewColumn />
          <AssetEntryColumn />
        </template>
      </WithLoader>
    </main>
  </div>
</template>