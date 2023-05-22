<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAsset } from '../../composables/useAsset'
import { parseAssetName } from '../../utils/assetHelpers'
import CopyAssetMarkdownButton from './CopyAssetMarkdownButton.vue'

const { asset, canEdit } = useAsset()
const router = useRouter()
</script>

<template>
  <cyan-top-app-bar
    modal
    back
    @back="router.back()"
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
      @click="router.push('/assets/' + asset.key + '/delete')"
    />
  </cyan-top-app-bar>
</template>