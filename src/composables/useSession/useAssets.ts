import { Asset } from "@11thdeg/skaldstore"
import { FirebaseError } from "firebase/app"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, query, where } from "firebase/firestore"
import { deleteObject, getDownloadURL, getStorage, ref as storageRef, uploadString } from "firebase/storage"
import { computed, ref, Ref } from "vue"
import { logError, logEvent } from "../../utils/loghelpers"
import { addStore, useSession } from "."
import { useI18n } from "vue-i18n"

let init = false
const assetCache: Ref<Map<string, Asset>> = ref(new Map())
let _unsubscribeAssets:undefined|CallableFunction

export function reset() {
  _unsubscribeAssets && _unsubscribeAssets()
  assetCache.value = new Map()
  init = false
}

export function subscibeToAssets() {
  initAssets()
}

async function initAssets() {
  if (init) {
    logError('Can not reinitialize assets')
    return
  }

  const { anonymous, uid } = useSession()
  if (anonymous.value || !uid.value) return // Do not initialize assets for anonymous users

  logEvent('subscribeAssets', { uid: uid.value })
  init = true
  addStore('assets', reset)

  // Get all assets for the current account, and store them in the cache
  const q = query(
    collection(
      getFirestore(),
      'assets'
    ),
    where('owners', 'array-contains', uid.value)
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


async function uploadAsset (name: string, mimetype:string, dataURL:string, description?:string, license?:number): Promise<Asset> {
  if (!init) {
    logError('uploadAsset', 'Assets not initialized')
    throw new Error('Assets not initialized')
  }
  const { account } = useSession()
  const storage = getStorage()

  const asseteRef = storageRef(
    storage,
    '/assetuploads/' + account.value.uid + '/' + name
  )

  const storageSnapshot = await uploadString(
    asseteRef,
    dataURL,
    'data_url'
  )

  const downloadUrl = await getDownloadURL(asseteRef)

  const asset = new Asset()
  asset.owners = [account.value.uid]
  asset.mimetype = mimetype
  asset.url = downloadUrl
  asset.storagePath = storageSnapshot.ref.fullPath
  asset.description = description??''
  asset.license = license??0

  const assetDocRef = await addDoc(
    collection(getFirestore(), 'assets'),
    asset.docData
  )

  // Get the fields auto-updated by the server, and add the asset
  // data to the cache
  const savedAssetDoc = await getDoc(assetDocRef)
  const data = await savedAssetDoc.data()

  if (!data) throw new Error('No data returned from addDoc')
  
  const cachedAsset = new Asset(data)
  assetCache.value.set(savedAssetDoc.id, cachedAsset)
  return cachedAsset
}

async function deleteAsset (id:string): Promise<void> {
  if (!init) {
    logError('deleteAsset', 'Assets not initialized')
    throw new Error('Assets not initialized')
  }
  const { account } = useSession()
  const assetDocRef = doc(getFirestore(), 'assets', id)
  const assetDoc = await getDoc(assetDocRef)

  if (!assetDoc.data()?.owners.includes(account.value.uid)) throw new Error('Delete would fail due to the firebase side security rules, aborting.')

  const storage = getStorage()
  try {
    const asseteRef = storageRef(
      storage,
      assetDoc.data()?.storagePath
    )
    await deleteObject(asseteRef)
  } catch (err) {
    if ((err as FirebaseError).code !== 'storage/object-not-found') throw err
    logError('Asset does not exist. The Firestore record will be deleted to avoid orphaned data.')
  }

  assetCache.value.delete(id)
  return deleteDoc(assetDocRef)
}

export function assetName (asset: Asset) {
  if (asset.name) return asset.name
  if (asset.storagePath) return asset.storagePath.substring(asset.storagePath.lastIndexOf('/') + 1)
  return "-"
}

export function assetDescription (asset: Asset) {
  if (asset.description) return asset.description
  return "-"
}

export function assetLicense (asset: Asset) {
  if (asset.license) return asset.license
  return "0"
}

export function useAssets() {
  if (!init) {
    initAssets()
  }
  return {
    assets: computed(() => Array.from(assetCache.value.values())),
    uploadAsset,
    deleteAsset,
    licenses: computed(() => {
      const { t } = useI18n()
      return [
        { label: t('fields.asset.licenses.0'), value: '0' },
        { label: t('fields.asset.licenses.1'), value: '1' },
        { label: t('fields.asset.licenses.2'), value: '2' },
        { label: t('fields.asset.licenses.3'), value: '3' },
      ]
    })
  }
}