import { Subscriber } from '@11thdeg/skaldstore'
import { doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore'
import { computed, ref, Ref } from 'vue'
import { addStore } from '.'
import { logDebug, logEvent } from '../../utils/logHelpers'

const subscriber: Ref<Subscriber|undefined> = ref(undefined)

function reset () {
  subscriber.value = undefined
  _firestoreUnsubscribe?.()
}

async function save () {
  if (subscriber.value) {
    const db = getFirestore()
    const docRef = doc(db, Subscriber.FIRESTORE_COLLECTION_NAME, subscriber.value.key)
    await setDoc(docRef, subscriber.value.docData)
  }
}

async function subscribeTo(key: string) {
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  logEvent('subscribe_entry', {
    entryType: 'thread',
    key: key
  })
  subscriber.value.addWatch(key)
  return save()
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
let _firestoreUnsubscribe:CallableFunction|undefined


async function initSubscriber (newSubscriberUid: string) {
  if (!newSubscriberUid) throw new Error('Subscriber uid not provided, aborting init')
  if (newSubscriberUid === subscriber.value?.key) return // already initialized
  
  if (loading) return

  reset()
  addStore('subscription', reset)
  loading = true

  _firestoreUnsubscribe = onSnapshot(
    doc(
      getFirestore(),
      Subscriber.collectionName,
      newSubscriberUid
    ),
    (snapshot) => {
      const data = snapshot.data()
      if (data) {
        subscriber.value = new Subscriber(newSubscriberUid, data)
        logDebug('useSubscriber', 'snapshot', data.watched)
      }
      loading = false
    }
  )  
  loading = false
}

function watches(key: string|undefined) {
  if (!key) return false
  if (!subscriber.value) return false
  return subscriber.value.watches(key) > 0
}

export function useSubscriber (newSubscriberUid?: string) {
  if (newSubscriberUid) initSubscriber(newSubscriberUid)
  return {
    subscriber: computed(() => subscriber.value),
    subscribeTo,
    mute,
    watches
  }
}