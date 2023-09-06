import { Subscriber } from '@11thdeg/skaldstore'
import { doc, getDoc, getFirestore, onSnapshot } from '@firebase/firestore'
import { Ref, computed, ref } from 'vue'
import { setStorable, updateStorable } from '../../utils/firestoreHelpers'
import { logDebug, logEvent } from '../../utils/logHelpers'
import { persistMessagingPermission } from '../../utils/messaging'
import { getMessaging, onMessage } from 'firebase/messaging'
import { useSnack } from '../useSnack'
import { useSession } from '../useSession'

/* STATE MANAGEMENT STARTS ******************/

const uid = ref('-')
const subscriber:Ref<Subscriber|undefined> = ref(undefined)
const initialized = ref(false)
let _unsubscribe: () => void

async function subscriberExists(newUid: string): Promise<boolean> {
  const dbdoc = await getDoc(
    doc(
      getFirestore(),
      Subscriber.collectionName,
      newUid
    )
  )
  if (dbdoc.exists()) {
    subscriber.value = new Subscriber(newUid, dbdoc.data())
    // logDebug('Subscriber loaded, seen', subscriber.value.docData.seenEntities)
  }
  return dbdoc.exists()
}

async function createSubscriber(newUid: string): Promise<void> {
  const sub = new Subscriber(newUid)
  sub.allSeenAt = Date.now() * 1000
  await setStorable(sub)
  logEvent('create_subscriber', { uid: newUid })
  return
}

async function subscribeToSubscriber(newUid: string): Promise<void> {
  _unsubscribe = onSnapshot(
    doc(
      getFirestore(),
      Subscriber.collectionName,
      newUid
    ),
    (snapshot) => {
      if (snapshot.exists()) {
        // logDebug('Subscriber snapshot received.', JSON.stringify(snapshot.data().seenEntities))
        subscriber.value = new Subscriber(newUid, snapshot.data())
        // logDebug('Subscriber loaded, seen', JSON.stringify(subscriber.value.docData.seenEntities))
        initialized.value = true
      }
    }
  )
}

/**
 * A function that initializes a subscriber object for the current user.
 *
 * @param {string} uid The user id of the current user.
 */
export async function initSubscriber(newUid: string, persistToken = false) {
  if (uid.value === newUid) throw new Error('Subscriber already initialized.')
  _unsubscribe?.()
  initialized.value = false
  uid.value = newUid

  subscriber.value = new Subscriber(uid.value)

  // The user might not have a subscriber object yet, so we create one.
  if (!(await subscriberExists(newUid))) {
    await createSubscriber(newUid)
  }

  // Subscribe to the subscriber object.
  await subscribeToSubscriber(newUid)
  
  // If the user has a messaging token, we add it to the subscriber object.
  if (persistToken) persistMessagingPermission()

  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.onBackgroundMessage` handler.

  const messaging = getMessaging()
  onMessage(messaging, (payload) => {
    logDebug('Message received. ', payload)
    const { pushSnack } = useSnack()

    const title = payload?.notification?.title || '-'
    const body = payload?.notification?.body || '-'
    pushSnack(title + '/' + body)
  })
}

/* SUBSCRIBER FUNCTIONALITY STARTS ******************/

function setSeen(key: string, flowTime?:number) {
  if (!subscriber.value) throw new Error('Subscriber not initialized')

  const seenEntities = subscriber.value.seenEntities

  // logDebug('setSeen before', JSON.stringify(seenEntities))

  // TODO: remove this when we have refactored the flowtime handling in
  // the client side. The flowtime should be set by the component calling
  // this function, not by this function itself.
  const t = flowTime || Date.now() * 1000
  if (!flowTime) logDebug('setSeen, using runtime client side flowtime at ', t)

  // The list of of seen is a Record<string, number>, so we can just 
  // replace the key.
  seenEntities[key] = t

  // logDebug('setSeen', key, t)
  // logDebug('setSeen after', JSON.stringify(seenEntities))

  // Update the subscriber object in Firestore, just the seenEntities (subscriber ref
  // will be updated by the snapshot listener, after the update is done in Firestore)
  updateStorable(subscriber.value.getFirestorePath(), { seenEntities })
}

function setUnSeen(key: string) {
  if (!subscriber.value) throw new Error('Subscriber not initialized')

  // Nothing to do if the key is not in the list of seen entities.
  if (!subscriber.value.seenEntities[key]) return
  
  const seenEntities = subscriber.value.seenEntities
  delete seenEntities[key]

  updateStorable(subscriber.value.getFirestorePath(), { seenEntities })
}

function markAllSeen() {
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  subscriber.value.allSeenAt = Date.now()
  updateStorable(subscriber.value)
}

function addMessagingToken(token: string) {
  if (!subscriber.value) throw new Error('Subscriber not initialized')

  // Sanity: don't add the token if it's already there
  if (subscriber.value.docData.messagingTokens.includes(token)) return

  subscriber.value.addMessagingToken(token)
  updateStorable(subscriber.value)
}

function removeMessagingToken(token: string) {
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  subscriber.value.removeMessagingToken(token)
  updateStorable(subscriber.value)
}

function save () {
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  updateStorable(subscriber.value)
}

/* COMPOSABLE STARTS ******************/

const loading = computed(() => {
  if (!uid.value || uid.value === '-') return true
  return !initialized.value
})

function isNew(key: string, flowTime: number) {
  const { anonymous } = useSession()
  if (anonymous.value) return false
  if (initialized.value === false) return false

  if (!subscriber.value) throw new Error('Subscriber not initialized')

  // logDebug('isNew', key, flowTime, subscriber.value.allSeenAt, subscriber.value.seenEntities[key])

  // See if we have seen all entities
  if (subscriber.value.allSeenAt > flowTime) return false

  const lastSeenAt = subscriber.value.seenEntities[key] || 0
  return flowTime > lastSeenAt
}

function seenAt(key: string) {
  const { anonymous } = useSession()
  if (anonymous.value) return false
  if(initialized.value === false) return false
  
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  return subscriber.value.seenEntities[key] || 0
}

/**
 * A composable function that returns a subscriber object for the current user.
 */
export function useSubscriber() {
  return {
    uid: computed(() => uid.value),
    subscriber: computed(() => subscriber.value),
    loading,
    setSeen,
    markAllSeen,
    addMessagingToken,
    removeMessagingToken,
    save,
    isNew,
    setUnSeen,
    seenAt
  }
}