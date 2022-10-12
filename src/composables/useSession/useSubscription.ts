import { Subscriber } from "@11thdeg/skaldstore"
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
import { ref, Ref } from "vue"
import { addStore, useSession } from "."

let _init = false
const subscriber: Ref<Subscriber|undefined> = ref(undefined)

function reset () {
  _init = false
  subscriber.value = undefined
}

async function save () {
  if (subscriber.value) {
    const db = getFirestore()
    const docRef = doc(db, Subscriber.FIRESTORE_COLLECTION_NAME, subscriber.value.key)
    await setDoc(docRef, subscriber.value.docData)
  }
}

export function watch(key: string) {
  if (!subscriber.value) throw new Error("Subscriber not initialized")
  subscriber.value.addWatch(key)
  save()
}

export async function initSubscriber () {
  if (_init) throw new Error('Can not reinitialize subscriptions')
  _init = true

  addStore('subscriptions', reset)
  const { uid } = useSession()
  if (!uid.value) throw new Error('Can not initialize subscriptions for anonymous users')

  const subscriberDoc = await getDoc(
    doc(
      getFirestore(),
      Subscriber.collectionName,
      uid.value
    )
  )
  if (!subscriberDoc.exists()) subscriber.value = new Subscriber(uid.value)
  else subscriber.value = new Subscriber(subscriberDoc.id, subscriberDoc.data())
}