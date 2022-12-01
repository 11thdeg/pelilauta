<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAssets, assetName, assetDescription, assetLicense } from '../../composables/useSession/useAssets'
import AssetCard from '../AssetCard.vue/AssetCard.vue'
import AddAssetButton from './AddAssetButton.vue'
import AddAssetButtonNew from '../AddAssetButton/AddAssetButton.vue'

const { t } = useI18n()
const { assets } = useAssets()

</script>
<template>
  <article class="Column large">
    <cyan-toolbar>
      <cyan-toolbar-heading :level="2">
        {{ t('assets.list.title') }}
      </cyan-toolbar-heading>
      <cyan-spacer />
      <AddAssetButtonNew />
      <AddAssetButton />
    </cyan-toolbar>
    <section class="cardGrid">
      <AssetCard
        v-for="asset in assets"
        :key="asset.key"
        :url="asset.url || ''"
        :to="`/assets/${asset.key}`"
        :name="assetName(asset)"
        :description="assetDescription(asset)"
        :license="assetLicense(asset)"
      />
    </section>
  </article>
  <!--article class="Column AssetListColumn double">
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
  </article-->
</template>

<style lang="sass" scoped>
.cardGrid
  display: flex
  flex-wrap: wrap
  gap: 8px
  cyan-card
    width: calc(100% / 2 - 8px)
</style>