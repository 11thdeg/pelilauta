import { Subscriber } from '@11thdeg/skaldstore'
import { doc, FirestoreError, getFirestore, onSnapshot, setDoc } from 'firebase/firestore'
import { computed, ref, Ref, watch } from 'vue'
import { addStore } from '.'
import { logDebug, logEvent } from '../../utils/logHelpers'
import { useSession } from '.'

const subscriber: Ref<Subscriber|undefined> = ref(undefined)

function reset () {
  subscriber.value = undefined
  _firestoreUnsubscribe?.()
}

async function save () {
  if (subscriber.value) {
    const db = getFirestore()
    const docRef = doc(db, Subscriber.FIRESTORE_COLLECTION_NAME, subscriber.value.key)
    try {
      await setDoc(docRef, subscriber.value.docData)
    } catch (error) {
      const firestoreError = error as FirestoreError
      logEvent('error', {
        error: firestoreError.code,
        message: firestoreError.message,
        source: 'useSubscriber.save'
      })
    }
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

let _init = false 
function init() {
  if (_init) return
  _init = true
  const { uid } = useSession()
  watch(uid, (newUid) => {
    logDebug('useSubscriber', 'init()', newUid)
    if (newUid) initSubscriber(newUid)
  }, { immediate: true })
}

export function useSubscriber () {
  init()
  return {
    subscriber: computed(() => subscriber.value),
    subscribeTo,
    mute,
    watches
  }
}