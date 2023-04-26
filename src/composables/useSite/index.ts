import { Site } from '@11thdeg/skaldstore'
import { PageCategory } from '@11thdeg/skaldstore/dist/entries/Site'
import { doc, DocumentData, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore'
import { computed, ref, Ref } from 'vue'
import { addStore, useSession } from '../useSession'
import { patchSite } from '../useSites'
import { subscribePages, usePages } from '../usePages'
import { logDebug } from '../../utils/logHelpers'

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

const canEdit = computed(() => {
  if (!site.value?.key) return false
  const { uid, admin } = useSession()
  if (admin.value) return true
  const u = uid.value
  if (site.value.members?.includes(u)) return true
  if (site.value.players?.includes(u)) return true
  if (site.value.hasOwner(u)) return true
  logDebug('canEdit', 'nope')
  return false
})

const chapterOptions = computed(() => {
  const cats = site.value?.pageCategories
  if (!cats) return []
  return [
    { label: '-', value: '-' },
    ...cats.map(c => ({
      label: c.name,
      value: c.slug
    }))]
})

export function useSite (id?: string) {
  if (id && site.value?.key !== id) {
    subscribeSite(id)
    // Load page index for this site
    logDebug('useSite', 'force-loading pages for', id)
    usePages(id)
  }
  return {
    site: computed(() => site.value),
    chapters: computed(() => site.value?.pageCategories || []),
    chapterOptions,
    updateChapters,
    key: computed(() => site.value?.key || ''),
    update,
    loading,
    notFound: computed(() => !loading.value && !site.value),
    canEdit
  }
}