<script setup lang="ts">
import { computed } from 'vue'
import TopBar from '../components/ui/TopBar.vue'
import { useSession } from '../composables/useSession'
import { useAssets, assetName, assetDescription, assetLicense } from '../composables/useSession/useAssets'
import ForbiddenView from '../components/ui/ForbiddenView.vue'
import ProfileTag from '../components/profiles/ProfileTag.vue'
import FlowTimeCaption from '../components/content/FlowTimeCaption.vue'
import AssetEntryForm from '../components/assets/AssetEntryForm.vue'

const props = defineProps<{
  assetkey: string
}>()

const { anonymous, uid } = useSession()
const { assets } = useAssets()

const asset = computed(() => {
  return assets.value.find((a) => a.key === props.assetkey)
})

const owner = computed(() => {
  const o = asset.value?.owners
  if (Array.isArray(o)) return o[0]
  return '' + o
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
        <article class="Column">
          <h4>{{ assetName(asset) }}</h4>
          <AssetEntryForm
            v-if="asset.hasOwner(uid)"
            v-model="asset"
          />
          <cyan-toolbar>
            <ProfileTag :uid="owner" />
            <FlowTimeCaption :flow-time="asset.flowTime" />
          </cyan-toolbar>
          <p class="TypeCaption">
            {{ assetDescription(asset) }}
          </p>
          <p>{{ assetLicense(asset) }}</p>

          {{ asset }}
        </article>
      </main>
    </template>
  </div>
</template>