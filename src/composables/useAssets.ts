import { Asset } from "@11thdeg/skaldstore"
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore"
import { computed, ref, Ref } from "vue"
import { logError } from "../utils/logHelpers"
import { addStore, useSession } from "./useSession"

let init = false
const assetCache: Ref<Map<string, Asset>> = ref(new Map())
let unsubscribeAssets:undefined|CallableFunction

export function reset() {
  unsubscribeAssets?.()
  assetCache.value = new Map()
  init = false
}

async function initAssets() {
  if (init) {
    logError('Can not reinitialize assets')
    return
  }
  init = true
  addStore('assets', reset)

  const { account } = useSession()

  // Get all assets for the current account, and store them in the cache
  const q = query(
    collection(
      getFirestore(),
      'assets'
    ),
    where('owners', 'array-contains', account.value.uid)
  )

  unsubscribeAssets = onSnapshot(q, snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'removed') {
        assetCache.value.delete(change.doc.id)
      } else {
        assetCache.value.set(change.doc.id, new Asset(change.doc.data(), change.doc.id))
      }
    })
  })
}

export function useAssets() {
  if (!init) {
    initAssets()
  }
  return {
    assets: computed(() => Array.from(assetCache.value.values()))
  }
}