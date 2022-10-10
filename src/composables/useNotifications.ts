import { Notification } from "@11thdeg/skaldstore"
import { collection, getDocs, getFirestore, limit, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { computed, ref, watch } from "vue"
import { logDebug } from "../utils/logHelpers"
import { useSession } from "./useSession"

let _init = false
let _unsubscribeNotifications:CallableFunction|undefined
const _notificationsCache = ref(new Map<string, Notification>())

function init () {
  if (_init) return
  _init = true

  const { uid } = useSession()
  watch(uid, (newUid) => {
    subscribeNotifications(newUid)
  })
}

async function subscribeNotifications (uid: string) {
  logDebug("subscribeNotifications", uid)
  _unsubscribeNotifications && _unsubscribeNotifications()
  _notificationsCache.value = new Map<string, Notification>()
  if (!uid) return // Anonyous user, no need to subscribe


  logDebug("subscribeNotifications", "subscribing", Notification.collectionName)

  const q = query(
    collection(getFirestore(), Notification.collectionName),
    where('to','==', uid),
    orderBy('createdAt', 'desc'),
    limit(30)
  )

  const docs = await getDocs(q)

  logDebug("subscribeNotifications", "subscribing", Notification.collectionName, "docs", docs.size)

  _unsubscribeNotifications = onSnapshot(
    q,
    (snapshot) => {
      logDebug("notifications snapshot", snapshot.docs)
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

export function useNotifications () {
  if (!_init) init()
  return {
    notifications: computed(() => {
      const arr = Array.from(_notificationsCache.value.values())
      arr.sort((b, a) =>  (b.createdAt ? b.createdAt.toDate().getTime() : 0) - (a.createdAt ? a.createdAt.toDate().getTime() : 0))
      return arr
    })
  }
}