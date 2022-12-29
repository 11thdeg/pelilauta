<script setup lang="ts">
import AssetEntryColumn from '../../components/assets/AssetEntryColumn.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import AssetTopBar from '../../components/AssetTopBar/AssetTopBar.vue'
import { useAsset } from '../../composables/useAsset'

const props = defineProps<{
  assetkey: string
}>()

const { asset, loading } = useAsset(props.assetkey)

</script>

<template>
  <div id="AssetView">
    <AssetTopBar :asset-key="props.assetkey" />
    <main class="bookLayout">
      <WithLoader :suspended="loading">
        <template v-if="asset">
          <article class="Column">
            <a
              :href="asset.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                style="max-width: 100%;"
                :src="asset.url"
                :alt="asset.name"
              >
            </a>
          </article>
          <AssetEntryColumn />
        </template>
      </WithLoader>
    </main>
  </div>
</template>