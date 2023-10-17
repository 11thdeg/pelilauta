<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useUserAssets } from '../../composables/useSession/useUserAssets'
import AddAssetButton from '../AddAssetButton/AddAssetButton.vue'
import { parseAssetName, hasPreview } from '../../utils/assetHelpers'
import { computed, ref } from 'vue'
import AssetFilterPanel from './AssetFilterPanel.vue'
import { Entry } from '@11thdeg/skaldstore'

const { t } = useI18n()
const { assets: originalAssets } = useUserAssets()

const assets = computed(() => {
  const arr = [...originalAssets.value]
  if (orderBy.value === 'name') arr.sort((a, b) => a.name.localeCompare(b.name))
  if (orderBy.value === '-name') arr.sort((a, b) => b.name.localeCompare(a.name))
  if (orderBy.value === 'flowtime') arr.sort((a, b) => (a as Entry).compareFlowTime(b as Entry))
  if (orderBy.value === '-flowtime') arr.sort((a, b) => (b as Entry).compareFlowTime(a as Entry))
  return arr
})

const orderBy = ref('name')

</script>
<template>
  <article class="column auto wd-large">
    <cyan-toolbar>
      <cyan-toolbar-heading :level="2">
        {{ t('assets.list.title') }}
      </cyan-toolbar-heading>
      <cyan-spacer />
      <AddAssetButton />
    </cyan-toolbar>

    <AssetFilterPanel v-model:orderBy="orderBy" />

    <section class="flex flex-wrap">
      <router-link 
        v-for="asset in assets"
        :key="asset.key"
        :to="`/assets/${asset.key}`"
      >
        <cn-asset-token
          style="display: block; height: 104px; width: 104px;"
          :type="asset.mimetype || 'unknown'"
          :label="parseAssetName(asset)"
          :preview="hasPreview(asset) ? asset.url : undefined"
        />
      </router-link>
    </section>

    <!--section class="cardGrid">
      <AssetCard
        v-for="asset in assets"
        :key="asset.key"
        :url="asset.url || ''"
        :to="`/assets/${asset.key}`"
        :name="parseAssetName(asset)"
        :description="parseAssetDescription(asset)"
        :license="parseAssetLicense(asset)"
      />
    </section-->
  </article>
</template>

<style lang="sass" scoped>
.flex-wrap
  padding-top: 12px
  display: flex
  flex-wrap: wrap
  gap: 15px
@media screen and (max-width: 768px)
  .flex-wrap
    gap: 24px
  
</style>