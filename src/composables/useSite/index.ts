import { Site } from '@11thdeg/skaldstore'
import { PageCategory } from '@11thdeg/skaldstore/dist/entries/Site'
import { doc, DocumentData, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore'
import { computed, ref, Ref } from 'vue'
import { addStore } from '../useSession'
import { patchSite } from '../useSites'
import { subscribePages } from '../usePages'

let subscribedSitekey = ''
let unsubscribeSite:CallableFunction|undefined
const site: Ref<Site | undefined> = ref(undefined)
const loading = ref(false)

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
  loading.value = true
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
      loading.value = false
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

export function loadSite (key: string) {
  if (site.value?.key === key) return // already subscribed
  subscribeSite(key)
  subscribePages(key)
}

export function useSite (id?: string) {
  if (id && site.value?.key !== id) {
    subscribeSite(id)
  }
  return {
    site: computed(() => site.value),
    chapters: computed(() => site.value?.pageCategories || []),
    key: computed(() => site.value?.key || ''),
    updateChapters,
    update,
    loading,
    notFound: computed(() => !loading.value && !site.value)
  }
}