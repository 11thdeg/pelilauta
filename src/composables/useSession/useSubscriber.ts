import { Subscriber } from '@11thdeg/skaldstore'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { computed, ref, Ref } from 'vue'
import { addStore } from '.'

const subscriber: Ref<Subscriber|undefined> = ref(undefined)

function reset () {
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
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  subscriber.value.addWatch(key)
  save()
}

export function unwatch(key: string) {
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  subscriber.value.removeWatch(key)
  save()
}

export function mute(key: string) {
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  subscriber.value.addMute(key)
  save()
}

export function unmute(key: string) {
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  subscriber.value.removeMute(key)
  save()
}

export function hasMuted(key: string) {
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  return subscriber.value.hasMuted(key)
}
let loading = false

async function initSubscriber (newSubscriberUid: string) {
  if (!newSubscriberUid) throw new Error('Subscriber uid not provided, aborting init')
  if (newSubscriberUid === subscriber.value?.key) return // already initialized
  
  if (loading) return
  loading = true

  const subscriberDoc = await getDoc(
    doc(
      getFirestore(),
      Subscriber.collectionName,
      newSubscriberUid
    )
  )
  
  if (!subscriberDoc.exists()) subscriber.value = new Subscriber(newSubscriberUid)
  else subscriber.value = new Subscriber(subscriberDoc.id, subscriberDoc.data())
  
  addStore('subscriptions', reset)  
  
  loading = false
}

export function useSubscriber (newSubscriberUid?: string) {
  if (newSubscriberUid) initSubscriber(newSubscriberUid)
  return {
    subscriber: computed(() => subscriber.value),
    watch
  }
}