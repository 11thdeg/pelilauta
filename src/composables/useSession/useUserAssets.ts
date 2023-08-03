import { Asset } from '@11thdeg/skaldstore'
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore'
import { computed, ref, Ref, watch } from 'vue'
import { addStore, useSession } from '.'

const assetCache: Ref<Map<string, Asset>> = ref(new Map())
let _unsubscribeAssets:undefined|CallableFunction

export function reset() {
  _unsubscribeAssets && _unsubscribeAssets()
  assetCache.value = new Map()
  _init = false
}

let _init = false
async function init() {
  if (_init) return
  _init = true

  const { uid } = useSession()
  watch(uid, (newUid) => {
    reset()
    if (newUid) subscribe(newUid)
  }, { immediate: true })
}
function subscribe(uid: string) {
  // logEvent('subscribeAssets', { uid: uid })
  addStore('assets', reset)

  // Get all assets for the current account, and store them in the cache
  const q = query(
    collection(
      getFirestore(),
      'assets'
    ),
    where('owners', 'array-contains', uid)
  )

  _unsubscribeAssets = onSnapshot(q, snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'removed') {
        assetCache.value.delete(change.doc.id)
      } else {
        assetCache.value.set(change.doc.id, new Asset(change.doc.data(), change.doc.id))
      }
    })
  })
}

export function assetDescription (asset: Asset) {
  if (asset.description) return asset.description
  return '-'
}

export function assetLicense (asset: Asset) {
  if (asset.license) return asset.license
  return '0'
}

function getAsset (key: string): Asset {
  return assetCache.value.get(key) ?? new Asset()
}

export function useUserAssets() {
  init()
  return {
    assets: computed(() => Array.from(assetCache.value.values())),
    getAsset
  }
}