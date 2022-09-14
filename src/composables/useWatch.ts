import { Account, Thread } from "@11thdeg/skaldstore"
import { doc, getFirestore, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore"
import { computed } from "vue"
import { logDebug } from "../utils/logHelpers"
import { useSession } from "./useSession"


async function watchThread (thread: Thread) {
  const { account, anonymous } = useSession()
  if (anonymous.value) return

  const watched = account.value.watched || []
  if (watched.find((w) => w.key === thread.key)) return
  
  const key = thread.key || ''
  watched.push({ key, lastSeen: serverTimestamp()})

  return updateDoc(
    doc(getFirestore(), Account.collectionName, account.value.uid),
    { watched: watched }
  )
}

async function unwatchThread (thread: Thread) {
  const { account, anonymous } = useSession()
  if (anonymous.value) return

  const watched = account.value.watched || []
  const index = watched.findIndex((w) => w.key === thread.key)
  if (index === -1) return

  watched.splice(index, 1)

  return updateDoc(
    doc(getFirestore(), Account.collectionName, account.value.uid),
    { watched: watched }
  )
}

async function setAllWatchedAsSeenFromNowOn () {
  const { account, anonymous } = useSession()
  if (anonymous.value) return
  updateDoc(
    doc(getFirestore(), Account.collectionName, account.value.uid),
    { seenSince: serverTimestamp() }
  )
}

function updatedSince (key:string, flowTime: number) {
  const { anonymous, account } = useSession()
  if (anonymous.value) return false
  const seenSince = account.value.seenSince || 0
  if (flowTime < seenSince) return false

  const entity = account.value.watched?.find((w) => w.key === key)
  if (!entity) return false
  const lastSeen = (entity.lastSeen as Timestamp)?.seconds || 0
  return flowTime > lastSeen
}

export function useWatch () {
  const { account, anonymous } = useSession()
  return {
    watchThread,
    unwatchThread,
    setAllWatchedAsSeenFromNowOn,
    updatedSince,
    watched: computed(() => { 
      if (anonymous.value) return []
      return account.value.watched || []
    }), 
    seenSince: computed(() => {
      if (anonymous.value) return null
      return account.value.seenSince || null
    })
  }
}