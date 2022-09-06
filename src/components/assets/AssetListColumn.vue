<script setup lang="ts">
import { Asset } from '@11thdeg/skaldstore';
import { useI18n } from 'vue-i18n'
import { useAssets } from '../../composables/useAssets'
import AddAssetButton from './AddAssetButton.vue';

const { t } = useI18n()
const { assets } = useAssets()

function assetName (asset: Asset) {
  if (asset.name) return asset.name
  if (asset.storagePath) return asset.storagePath.substring(asset.storagePath.lastIndexOf('/') + 1)
  return "-"
}

function assetDescription (asset: Asset) {
  if (asset.description) return asset.description
  return "-"
}

function assetLicense (asset: Asset) {
  if (asset.license) return asset.license
  return "-"
}

</script>
<template>
  <article class="Column AssetListColumn double">
    <cyan-toolbar>
      <h2>{{ t('assets.list.title') }}</h2>
      <cyan-spacer />
      <AddAssetButton />
    </cyan-toolbar>
    <section class="AssetList dataTable threeCols">
      <template
        v-for="asset in assets"
        :key="asset.id"
      >
        <p>
          <img
            style="max-width: 72px;max-height: 72px;"
            :src="asset.url"
            :alt="asset.name"
          >
        </p>
        <div>
          <h4>{{ assetName(asset) }}</h4>
          <p class="TypeCaption">
            {{ assetDescription(asset) }}
          </p>
        </div>
        <p>{{ assetLicense(asset) }}</p>
      </template>
    </section>
  </article>
</template>