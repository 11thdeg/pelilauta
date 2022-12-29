<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAssets, assetDescription, assetLicense } from '../../composables/useSession/useAssets'
import AssetCard from '../AssetCard.vue/AssetCard.vue'
import AddAssetButton from '../AddAssetButton/AddAssetButton.vue'
import { parseAssetName } from '../../utils/parseAssetName'

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
      <AddAssetButton />
    </cyan-toolbar>
    <section class="cardGrid">
      <AssetCard
        v-for="asset in assets"
        :key="asset.key"
        :url="asset.url || ''"
        :to="`/assets/${asset.key}`"
        :name="parseAssetName(asset)"
        :description="assetDescription(asset)"
        :license="assetLicense(asset)"
      />
    </section>
  </article>
</template>

<style lang="sass" scoped>
.cardGrid
  display: flex
  flex-wrap: wrap
  gap: 8px
  cyan-card
    width: calc(100% / 2 - 8px)
</style>