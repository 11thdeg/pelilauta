import { Reply, Thread } from "@11thdeg/skaldstore"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { ref } from "vue"

// Note: reply keys are unique across collectios --> thus replies can be cached
// with key only, outside the thread/site/page context
const replyCache = ref(new Map<string, Reply>())

export async function fetchReply(threadkey:string, replykey:string) {
  // We have a cached version of the thread
  if (replyCache.value.has(replykey)) return replyCache.value.get(replykey)

  const replyDoc = await getDoc(
    doc(getFirestore(), Thread.collectionName, threadkey, Reply.collectionName, replykey)
  )
  if (replyDoc.exists()) {
    const reply = new Reply(replyDoc.data(), replyDoc.id)
    replyCache.value.set(replyDoc.id, reply)
    return reply
  }
  return undefined
}

export function stashReply(reply:Reply) {
  if (!reply.key) throw new Error('Can not stash a Reply without a Reply.key')
  replyCache.value.set(reply.key, reply)
}