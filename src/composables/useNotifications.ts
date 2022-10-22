import { Notification } from '@11thdeg/skaldstore'
import { collection, getFirestore, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { computed, ref, watch } from 'vue'
import { logEvent } from '../utils/logHelpers'
import { useSession } from './useSession'

let _init = false
let _unsubscribeNotifications:CallableFunction|undefined
const _notificationsCache = ref(new Map<string, Notification>())
const subscriptionLimit = 30

function init () {
  if (_init) return
  _init = true

  const { uid } = useSession()
  watch(uid, (newUid) => {
    subscribeNotifications(newUid)
  })
}

async function subscribeNotifications (uid: string) {
  _unsubscribeNotifications && _unsubscribeNotifications()
  _notificationsCache.value = new Map<string, Notification>()
  if (!uid) return // Anonyous user, no need to subscribe

  logEvent('subscribeNotifications', { uid: uid })

  const q = query(
    collection(getFirestore(), Notification.collectionName),
    where('to','==', uid),
    orderBy('createdAt', 'desc'),
    limit(subscriptionLimit)
  )

  _unsubscribeNotifications = onSnapshot(
    q,
    (snapshot) => {
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
  if (!_init) init()
  return {
    notifications,
    newCount
  }
}