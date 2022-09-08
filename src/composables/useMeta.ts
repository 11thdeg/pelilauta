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

function init () {
  if (_init) return
  _init = true
  onSnapshot(
    doc(getFirestore(), 'meta', 'pelilauta'),
    (snapshot) => {
        const s = new Array<StreamData>()
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

export function useMeta () {
  init()
  return {
    streams: computed(() => streams.value)
  }
}