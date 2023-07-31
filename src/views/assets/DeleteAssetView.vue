<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useAsset } from '../../composables/useAsset'
import { useAssets } from '../../composables/useAssets'
import { useSnack } from '../../composables/useSnack'
import { parseAssetName } from '../../utils/assetHelpers'
import AssetPreviewColumn from '../../components/AssetPreviewColumn/AssetPreviewColumn.vue'

const props = defineProps<{
  assetkey: string
}>()

const { t } = useI18n()
// eslint-disable-next-line vue/no-setup-props-destructure
const { asset, loading, canEdit, notFound } = useAsset(props.assetkey)
const { removeAsset } = useAssets()
const router = useRouter()
const { pushSnack } = useSnack()

function confirmDelete() {
  if (!canEdit.value) throw new Error('You don\'t have permission to delete this asset.')
  removeAsset(asset.value.key)
  pushSnack('snacks.asset.delete.success')
  router.push('/assets')
}

</script>

<template>
  <cn-app-bar
    id="TopBar"
    modal
    :title="$t('action.delete')"
    @back="router.back()"
  />
  <main class="bookLayout">
    <WithLoader :suspended="loading">
      <WithPermission :forbidden="!canEdit">
        <EmptyCollection
          v-if="notFound"
          :title="t('asset.notFound')"
          noun="assets"
        />
        <template v-else>
          <AssetPreviewColumn /> 
          <article
            class="Column"
          >
            <h3 class="nowrap">
              {{ parseAssetName(asset) }}
            </h3>
            <p>{{ t('asset.delete.description') }}</p>
            <cyan-toolbar>
              <cyan-spacer />
              <cyan-button
                secondary
                noun="trashcan"
                :label="t('action.delete')"
                @click="confirmDelete"
              />
              <cyan-spacer />
            </cyan-toolbar>
          </article>
        </template>
      </WithPermission>
    </WithLoader>
  </main>
</template>

<style scoped>
.nowrap {
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>