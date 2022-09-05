<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAssets } from '../../composables/useAssets'
import AddAssetButton from './AddAssetButton.vue';

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
    <section class="AssetList dataTable fourCols">
      <template
        v-for="asset in assets"
        :key="asset.id"
      >
        <p>
          <img
            :src="asset.url"
            :alt="asset.name"
          >
        </p>
        <div>
          <h4>{{ asset.name || asset.storagePath?.substring(asset.storagePath?.lastIndexOf('/')+1) }}</h4>
          <p>{{ asset.description }}</p>
        </div>
        <p>{{ asset.license }}</p>
        <p><cyan-button label="DELETE" /></p>
      </template>
    </section>
  </article>
</template>