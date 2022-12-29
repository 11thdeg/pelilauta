<script lang="ts" setup>
import { useAsset } from '../../composables/useAsset'
import { parseAssetName } from '../../utils/parseAssetName'
import CopyAssetMarkdownButton from './CopyAssetMarkdownButton.vue'

const { asset, canEdit } = useAsset()
</script>

<template>
  <cyan-top-app-bar
    modal
    back
    @back="$router.back()"
  >
    <h4 class="downscaled">
      {{ parseAssetName(asset) }}
    </h4>
    <cyan-spacer />
    <CopyAssetMarkdownButton />
    <cyan-button
      v-if="canEdit"
      noun="trashcan"
      text
      @click="$router.push('/assets/' + asset.key + '/delete')"
    />
  </cyan-top-app-bar>
</template>