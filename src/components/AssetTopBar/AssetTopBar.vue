<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAsset } from '../../composables/useAsset'
import { parseAssetName } from '../../utils/assetHelpers'
import CopyAssetMarkdownButton from './CopyAssetMarkdownButton.vue'

const { asset, canEdit } = useAsset()
const router = useRouter()
</script>

<template>
  <cn-app-bar
    modal
    :title="parseAssetName(asset)"
    @back="router.back()"
  >
    <CopyAssetMarkdownButton />
    <cyan-button
      v-if="canEdit"
      noun="trashcan"
      text
      @click="router.push('/assets/' + asset.key + '/delete')"
    />
  </cn-app-bar>
</template>