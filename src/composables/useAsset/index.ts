import { Asset } from '@11thdeg/skaldstore'
import { computed, ref } from 'vue'
import { logDebug } from '../../utils/logHelpers'
import { useSession } from '../useSession'

const asset = ref(new Asset())
const loading = ref(true)
const notFound = ref(false)

async function loadAsset(key: string) {
  logDebug('useAsset.loadAsset()', { key })
  loading.value = true
  const { useAssets } = await import('../useAssets')
  const { fetchAsset } = useAssets()
  const newAsset = await fetchAsset(key)
  
  if (newAsset) {
    asset.value = newAsset
    notFound.value = false
  } else {
    asset.value = new Asset()
    notFound.value = true
  }
  loading.value = false
}

const canEdit = computed(() => {
  const { uid } = useSession()
  return asset.value.hasOwner(uid.value)
})

export function useAsset(key?: string) {
  if (key && asset.value.key !== key) {
    loadAsset(key || '')
  }
  return {
    asset: computed(() => asset.value),
    loading: computed(() => loading.value),
    notFound: computed(() => notFound.value),
    canEdit
  }
}