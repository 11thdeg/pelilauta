<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAssets, assetName, assetDescription, assetLicense } from '../../composables/useSession/useAssets'
import AddAssetButton from './AddAssetButton.vue'

const { t } = useI18n()
const { assets } = useAssets()

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
          <router-link :to="`/assets/${asset.key}`">
            <img
              style="max-width: 72px;max-height: 72px;"
              :src="asset.url"
              :alt="asset.name"
            >
          </router-link>
        </p>
        <div>
          <p><strong>{{ assetName(asset) }}</strong></p>
          <p class="TypeCaption">
            {{ assetDescription(asset) }}
          </p>
        </div>
        <p>{{ assetLicense(asset) }}</p>
        <div><hr></div>
        <div><hr></div>
        <div><hr></div>
      </template>
    </section>
  </article>
</template>