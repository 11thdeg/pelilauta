type Asset = {
  url?: string
  storagePath?: string
  name?: string,
  license?: number,
  description?: string
}

export function parseAssetName(asset:Asset): string {
  if (asset.name) return asset.name
  if (asset.url?.startsWith('https://')) return asset.url
  if (asset.storagePath) return asset.storagePath
  return '*'
}

export function parseAssetLicense(asset:Asset): number {
  if (asset.license) return asset.license
  return 0
}

export function parseAssetDescription(asset:Asset): string {
  if (asset.description) return asset.description
  return parseAssetName(asset)
}