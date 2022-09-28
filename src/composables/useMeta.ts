import { doc, getFirestore, onSnapshot } from "firebase/firestore"
import { computed, ref } from "vue"

interface StreamData {
    slug: string
    name: string,
    icon: string
    count: number
    order: number
  }

let _init = false
const streams = ref<StreamData[]>([])

export interface SiteFamily {
  name: string
  icon: string
  id: string
}
const siteFamilies = ref<SiteFamily[]>([])

function init () {
  if (_init) return
  _init = true
  onSnapshot(
    doc(getFirestore(), 'meta', 'pelilauta'),
    (snapshot) => {
      const s = new Array<StreamData>()
      const data = snapshot.data()
      if (data) {
        if (data.admins) admins.value = data.admins
        if (data.frozen) frozen.value = data.frozen
        siteFamilies.value = data.siteThemes || []
      }
      for (const key in snapshot.data()?.streams) {
        if(key === '-') continue // skip the '-' key as it's reserved for unassigned streams
        s.push({
          slug: key,
          name: snapshot.data()?.streams[key]?.name || key,
          icon: snapshot.data()?.streams[key]?.icon || 'none',
          count: snapshot.data()?.streams[key]?.count || 0,
          order: snapshot.data()?.streams[key]?.order || 0
        })
      }
      streams.value = s.sort((a, b) => {
        if (a.order === b.order) return a.name > b.name ? 1 : -1
        return a.order > b.order ? 1 : -1
      })
    }
  )
}

const admins = ref<string[]>([])
const frozen = ref<string[]>([])

export function useMeta () {
  init()
  return {
    streams: computed(() => streams.value),
    admins: computed(() => admins.value),
    frozen: computed(() => frozen.value),
    siteFamilies: computed(() => siteFamilies.value)
  }
}