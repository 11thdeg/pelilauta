import { Page, Site } from "@11thdeg/skaldstore"
import { collection, getFirestore, onSnapshot } from "firebase/firestore"
import { computed, ref } from "vue"

let _init = false
let unsubscribe:CallableFunction|undefined
const metaPages = ref(new Map<string, Page>())

async function init () {
  if (_init) return
  _init = true

  unsubscribe && unsubscribe()
  unsubscribe = onSnapshot(
    collection(
      getFirestore(),
      Site.collectionName,
      'mekanismi',
      Page.collectionName
    ),
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          metaPages.value.delete(change.doc.id)
        }
        else {
          const p = new Page(change.doc.data(), change.doc.id)
          // logDebug('loading metapage', p.key)
          metaPages.value.set(change.doc.id, p)
        }
      })
    })
}

export function useMetaPages () {
  init()
  return {
    pages: computed(() => metaPages.value),
  }
}