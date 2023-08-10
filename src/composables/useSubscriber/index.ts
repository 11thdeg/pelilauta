import { Subscriber } from '@11thdeg/skaldstore'
import { doc, getDoc, getFirestore, onSnapshot } from '@firebase/firestore'
import { computed, ref } from 'vue'
import { setStorable, updateStorable } from '../../utils/firestoreHelpers'
import { logDebug, logEvent } from '../../utils/logHelpers'
import { persistMessagingPermission } from '../../utils/messaging'
import { getMessaging, onMessage } from 'firebase/messaging'
import { useSnack } from '../useSnack'

/* STATE MANAGEMENT STARTS ******************/

const uid = ref('')
const subscriber = ref(new Subscriber('-'))
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
    logDebug('Subscriber', subscriber.value.docData)
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
        logDebug('Subscriber snapshot received.')
        subscriber.value = new Subscriber(newUid, snapshot.data())
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

  initialized.value = true
}

/* SUBSCRIBER FUNCTIONALITY STARTS ******************/

function watches(key: string|undefined) {
  if (!key) return false
  if (!subscriber.value) return false
  return subscriber.value.watches(key) > 0
}

/**
 * returns true if the user should be notified about the storable with the given key.
 * 
 * @param key {string} The key of the storable to check
 * @param flowTime {number} The flowTime of the storable to check
 * @returns {boolean} true if the user should be notified about the storable with the given key.
 */
function shouldNotify(key: string, flowTime: number): boolean {
  if ( loading.value ) return false
  // logDebug('shouldNotify', key, flowTime, uid.value)
  if ( !subscriber.value || !uid.value ) return false
  return subscriber.value.isNew(key, flowTime) 
}

function mute(key: string) {
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  subscriber.value.addMute(key)
  updateStorable(subscriber.value)
}

function subscribeTo(key: string) {
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  subscriber.value.addWatch(key, Date.now() * 1000)
  updateStorable(subscriber.value)
}

function setSeen(key: string) {
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  subscriber.value.markSeen(key, Date.now() * 1000)
  updateStorable(subscriber.value)
}

function markAllSeen() {
  if (!subscriber.value) throw new Error('Subscriber not initialized')
  subscriber.value.allSeenAt = Date.now() * 1000
  updateStorable(subscriber.value)
}

function addMessagingToken(token: string) {
  if (!subscriber.value) throw new Error('Subscriber not initialized')

  // Sanity: don't add the token if it's already there
  if (subscriber.value.messagingTokens.includes(token)) return

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
  if (!uid.value || uid.value === '-') return false
  return !initialized.value
})

/**
 * A composable function that returns a subscriber object for the current user.
 */
export function useSubscriber() {
  return {
    uid: computed(() => uid.value),
    subscriber: computed(() => subscriber.value),
    loading,
    watches,
    mute,
    subscribeTo,
    setSeen,
    markAllSeen,
    shouldNotify,
    addMessagingToken,
    removeMessagingToken,
    save
  }
}