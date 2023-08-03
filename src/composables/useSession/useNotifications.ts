import { Notification } from '@11thdeg/skaldstore'
import { collection, getDocs, getFirestore, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { computed, ref } from 'vue'
import { addStore } from '.'
import { logDebug, logEvent } from '../../utils/logHelpers'

let _unsubscribeNotifications:CallableFunction|undefined
const _notificationsCache = ref(new Map<string, Notification>())
const subscriptionLimit = 33


export async function subscribeNotifications (uid: string) {
  reset()
  if (!uid) return // Anonyous user, no need to subscribe

  // logEvent('subscribeNotifications', { uid: uid })

  const q = query(
    collection(getFirestore(), Notification.collectionName),
    where('to','==', uid),
    orderBy('createdAt', 'desc'),
    limit(subscriptionLimit)
  )

  getDocs(q)

  _unsubscribeNotifications = onSnapshot(
    q,
    (snapshot) => {
      // logDebug('subscribeNotifications', 'onSnapshot', snapshot.docs.length)
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          _notificationsCache.value.delete(change.doc.id)
        }
        else {
          _notificationsCache.value.set(change.doc.id, new Notification(change.doc.data(), change.doc.id))
        }
      })
    }
  )
  addStore('notifications', reset)
}

function reset () {
  _unsubscribeNotifications && _unsubscribeNotifications()
  _notificationsCache.value = new Map<string, Notification>()
}

const notifications = computed(() => {
  const arr = Array.from(_notificationsCache.value.values())
  arr.sort((a, b) =>  (b.createdAt ? b.createdAt.toDate().getTime() : 0) - (a.createdAt ? a.createdAt.toDate().getTime() : 0))
  return arr
})

const newCount = computed(() => {
  const l = notifications.value.filter(n => !n.read).length
  if (l > subscriptionLimit) return '29+'
  return l.toString()
})

export function useNotifications () {
  return {
    notifications,
    newCount,
    hasNew: computed(() => newCount.value !== '0'),
  }
}