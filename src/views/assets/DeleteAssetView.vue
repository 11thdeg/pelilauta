<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import TopBar from '../../components/navigation/TopBar.vue'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useAsset } from '../../composables/useAsset'
import { useAssets } from '../../composables/useAssets'
import { useSnack } from '../../composables/useSnack'
import { parseAssetName } from '../../utils/assetHelpers'

const props = defineProps<{
  assetkey: string
}>()

const { t } = useI18n()
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
  <TopBar :title="t('action.delete')" />
  <main class="bookLayout">
    <WithLoader :suspended="loading">
      <WithPermission :forbidden="!canEdit">
        <EmptyCollection
          v-if="notFound"
          :title="t('asset.notFound')"
          noun="assets"
        />
        <article
          v-else
          class="Column"
        >
          <h3>{{ parseAssetName(asset) }}</h3>
          <p>{{ t('asset.delete.confirm') }}</p>
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
      </WithPermission>
    </WithLoader>
  </main>
</template>