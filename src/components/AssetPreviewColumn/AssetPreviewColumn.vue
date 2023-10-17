<script lang="ts" setup>
import { computed } from 'vue'
import { useAsset } from '../../composables/useAsset'
import { hasPreview } from '../../utils/assetHelpers'

const { asset } = useAsset()

const asImage = computed(() => {
  return hasPreview(asset.value)
})
</script>

<template>
  <article class="column">
    <a
      v-if="asImage"
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
    <iframe
      v-else
      class="preview"
      :src="asset.url"
      width="220px"
      height="320px"
    />
  </article>
</template>

<style lang="sass" scoped>
.preview
  border: 0
  width: 100%
  height: calc(100vh - 140px)
  border-radius: 16px
</style>