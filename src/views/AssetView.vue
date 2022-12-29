<script setup lang="ts">
import { computed } from 'vue'
import TopBar from '../components/navigation/TopBar.vue'
import { useSession } from '../composables/useSession'
import { useAssets } from '../composables/useSession/useAssets'
import AssetEntryColumn from '../components/assets/AssetEntryColumn.vue'
import WithPermission from '../components/ui/WithPermission.vue'
import WithLoader from '../components/ui/WithLoader.vue'
import { useI18n } from 'vue-i18n'
import { useSnack } from '../composables/useSnack'
import { parseAssetName } from '../utils/parseAssetName'

const props = defineProps<{
  assetkey: string
}>()

const { t } = useI18n()
const { anonymous } = useSession()
const { assets } = useAssets()
const { pushSnack } = useSnack()

const asset = computed(() => {
  return assets.value.find((a) => a.key === props.assetkey)
})

const label = computed(() => {
  const a = asset.value
  if (!a) return '...'
  return parseAssetName(asset.value)
})

function copyMarkdown () {
  const a = asset.value
  if (!a) return
  navigator.clipboard.writeText(`![${a.name || 'An unnamed image from the library'}](${a.url})`)
  pushSnack(t('snacks.markdownCopiedToClipboard'))
}

</script>

<template>
  <div id="AssetView">
    <TopBar
      :title="label"
      sticky
    />
    <main class="bookLayout">
      <WithPermission :forbidden="anonymous">
        <WithLoader :suspended="!asset">
          <template v-if="asset">
            <article class="Column">
              <img
                style="max-width: 100%;"
                :src="asset.url"
                :alt="asset.name"
              >
              <cyan-toolbar>
                <cyan-button
                  text
                  noun="share"
                  :label="t('action.copy.markdown')"
                  @click="copyMarkdown"
                />
              </cyan-toolbar>
            </article>
            <AssetEntryColumn v-model="asset" />
          </template>
        </WithLoader>
      </WithPermission>
    </main>
  </div>
</template>