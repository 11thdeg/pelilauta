import { Site } from "@11thdeg/skaldstore"
import { PageCategory } from "@11thdeg/skaldstore/dist/entries/Site"
import { doc, DocumentData, getFirestore, onSnapshot, updateDoc } from "firebase/firestore"
import { computed, ref, Ref } from "vue"
import { addStore } from "../useSession"
import { patchSite } from "../useSites"

let subscribedSitekey = ''
let unsubscribeSite:CallableFunction|undefined
const site: Ref<Site | undefined> = ref(undefined)

async function updateChapters (chapters: PageCategory[]) {
  const s = site.value
  if(!s || !s.key) throw new Error('No site to update')
  return updateDoc(
    doc(getFirestore(), Site.collectionName, s.key),
    { pageCategories: chapters }
  )
}

function reset () {
  site.value = undefined
  subscribedSitekey = ''
  unsubscribeSite && unsubscribeSite()
}

function subscribeSite (key: string) {
  if(subscribedSitekey === key) return // already subscribed
  reset()
  subscribedSitekey = key
  addStore('site', reset)

  unsubscribeSite = onSnapshot(
    doc(getFirestore(), Site.collectionName, key),
    (snapshot) => {
      if(snapshot.exists()) {
        const s = new Site(snapshot.data(), snapshot.id)
        site.value = s
        patchSite(s)
      }
    }
  )
}

async function update (data: DocumentData) {
  const s = site.value
  if(!s || !s.key) throw new Error('No site to update')
  return updateDoc(
    doc(getFirestore(), Site.collectionName, s.key),
    data
  )
}

export function useSite (id?: string) {
  if (id && site.value?.key !== id) {
    subscribeSite(id)
  }
  return {
    site: computed(() => site.value),
    chapters: computed(() => site.value?.pageCategories || []),
    updateChapters,
    update
  }
}