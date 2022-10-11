<script setup lang="ts">
import { computed } from 'vue'
import TopBar from '../components/ui/TopBar.vue'
import { useSession } from '../composables/useSession'
import { useAssets, assetName } from '../composables/useSession/useAssets'
import ForbiddenView from '../components/ui/ForbiddenView.vue'
import AssetEntryColumn from '../components/assets/AssetEntryColumn.vue'

const props = defineProps<{
  assetkey: string
}>()

const { anonymous } = useSession()
const { assets } = useAssets()

const asset = computed(() => {
  return assets.value.find((a) => a.key === props.assetkey)
})

</script>

<template>
  <div id="AssetView">
    <ForbiddenView v-if="anonymous" />
    <template v-else-if="asset">
      <TopBar :title="assetName(asset)" />
      <main class="bookLayout">
        <article class="Column double">
          <img
            style="max-width: 100%;"
            :src="asset.url"
            :alt="asset.name"
          >
        </article>
        <AssetEntryColumn v-model="asset" />
        <div class="debug Column">
          {{ asset }}
        </div>
      </main>
    </template>
  </div>
</template>