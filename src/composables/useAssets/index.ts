import { Asset } from '@11thdeg/skaldstore'
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { deleteObject, getDownloadURL, getStorage, ref as storageRef, StorageError, uploadString } from 'firebase/storage'
import { computed, ref } from 'vue'
import { FileData } from '../../utils/fileHelpers'
import { logDebug, logEvent } from '../../utils/logHelpers'
import { useSession } from '../useSession'

const assetCache = ref(new Map<string, Asset>())

let _init = false
function init() {
  if(_init) return
  _init = true
}

async function fetchAsset(key: string): Promise<Asset|undefined> {
  if(assetCache.value.has(key)) return assetCache.value.get(key)

  else {
    logDebug('useAssets().fetchAsset()', { key })
    const docRef = doc(getFirestore(), Asset.collectionName, key)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const asset = new Asset(docSnap.data(), key)
      assetCache.value.set(key, asset)
      return asset
    } else {
      logEvent('useAssets().fetchAsset()', { key, error: 'not found' })
      return undefined
    }
  }
}

async function uploadFileToStorage(file: FileData) {
  const storage = getStorage()
  const { uid } = useSession()
  const asseteRef = storageRef(
    storage,
    '/assetuploads/' + uid.value + '/' + file.name
  )
  const sr = await uploadString(
    asseteRef,
    file.dataURL,
    'data_url'
  )
  const url = await getDownloadURL(asseteRef)
  return {
    url: url,
    storagePath: sr.ref.fullPath
  }
}

async function removeAsset(key?: string) {
  if (!key) throw new Error('No key provided, can not delete the asset')
  const asset = await fetchAsset(key)
  if (!asset) throw new Error('Asset not found, can not delete')
  
  assetCache.value.delete(key)

  const storage = getStorage()
  const sf = storageRef(storage, asset.storagePath || '')
  try {
    await deleteObject(sf)
  } catch (error) {
    const e = error as StorageError
    logEvent('useAssets().removeAsset()', { key, error: e.message })
  }

  await deleteDoc(doc(getFirestore(), Asset.collectionName, key))
}

type AssetData = {
  key?: string
  name?: string
  description?: string
  license: string
  owners?: string|string[]
}

async function uploadAssetFileData(asset: AssetData, filedata:FileData) {
  const storageEntry = await uploadFileToStorage(filedata)

  const oldAsset =  asset.key ? await fetchAsset(asset.key) : undefined
  const baseEntry = oldAsset ? oldAsset : new Asset()

  baseEntry.mimetype = filedata.mimetype
  baseEntry.url = storageEntry.url
  baseEntry.storagePath = storageEntry.storagePath
  baseEntry.description = asset.description || ''
  baseEntry.license = asset.license || 0
  baseEntry.owners = asset.owners || [useSession().uid.value]
  baseEntry.name = asset.name || filedata.name

  let key = asset.key

  if (key) {
    await updateDoc(doc(getFirestore(), Asset.collectionName, key), baseEntry.docData)
  } else {
    const newDoc = await addDoc(collection(getFirestore(), Asset.collectionName), baseEntry.docData)
    key = newDoc.id
  }
  // Stale while revalidate
  assetCache.value.set(key, baseEntry)
  return key
}

export function useAssets() {
  init()
  return {
    fetchAsset,
    uploadAssetFileData,
    removeAsset,
    assetCache: computed(() => assetCache.value),
  }
}