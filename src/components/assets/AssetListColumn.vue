<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { parseAssetDescription, parseAssetLicense } from '../../utils/assetHelpers'
import { useUserAssets } from '../../composables/useSession/useUserAssets'
import AssetCard from '../AssetCard.vue/AssetCard.vue'
import AddAssetButton from '../AddAssetButton/AddAssetButton.vue'
import { parseAssetName } from '../../utils/assetHelpers'

const { t } = useI18n()
const { assets } = useUserAssets()

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
        :description="parseAssetDescription(asset)"
        :license="parseAssetLicense(asset)"
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