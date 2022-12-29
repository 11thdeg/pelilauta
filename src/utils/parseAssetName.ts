type Asset = {
  url?: string
  storagePath?: string
  name: string
}

export function parseAssetName(asset:Asset): string {
  if (asset.name) return asset.name
  if (asset.url?.startsWith('https://')) return asset.url
  if (asset.storagePath) return asset.storagePath
  return '*'
}