import { Site } from "@11thdeg/skaldstore"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { ref } from "vue"
import { logError } from "../utils/logHelpers"

const siteCache = ref(new Map<string, Site>())

export async function fetchSite (key:string) {
  if (siteCache.value.has(key)) {
    return siteCache.value.get(key)
  }
  const siteDoc = await getDoc(
    doc(getFirestore(), Site.collectionName, key)
  )
  if (siteDoc.exists()) {
    const site = new Site(siteDoc.data(), key)
    siteCache.value.set(key, site)
    return site
  }
  logError('Site not found', key)
  return undefined
}