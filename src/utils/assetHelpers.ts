type Asset = {
  url?: string
  storagePath?: string
  name?: string,
  license?: string,
  description?: string,
  mimetype?: string
}

export function parseAssetName(asset:Asset): string {
  if (asset.name) return asset.name
  if (asset.url?.startsWith('https://')) return asset.url
  if (asset.storagePath) return asset.storagePath
  return '*'
}

export function parseAssetLicense(asset:Asset): string {
  if (asset.license) return asset.license
  return ''
}

export function parseAssetDescription(asset:Asset): string {
  if (asset.description) return asset.description
  return parseAssetName(asset)
}

export function hasPreview (asset: Asset) {
  return asset.mimetype?.startsWith('image/') || asset.mimetype?.startsWith('video/')
}