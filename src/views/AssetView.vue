<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TopBar from '../components/ui/TopBar.vue'
import { useAssets, assetName, assetDescription, assetLicense } from '../composables/useAssets'

const { t } = useI18n()

const props = defineProps<{
  assetkey: string
}>()

const { assets } = useAssets()

const asset = computed(() => {
  return assets.value.find((a) => a.key === props.assetkey)
})

</script>

<template>
  <TopBar :title="t('assetView.title')" />
  <main class="singleColumnLayout">
    <article
      v-if="asset"
      class="Column"
    >
      <h1>{{ assetName(asset) }}</h1>
      <img
        :src="asset.url"
        :alt="asset.name"
      >
      <p>{{ assetDescription(asset) }}</p>
      <p>{{ asset.mimetype }}</p>
      <p>{{ t('assets.license.'+assetLicense(asset)) }}</p>
      <p>{{ asset.owners }}</p>
    </article>
  </main>
</template>