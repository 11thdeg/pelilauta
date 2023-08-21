import { Reaction, Reply } from '@11thdeg/skaldstore'
import { doc, getDoc, getFirestore, runTransaction, Transaction } from '@firebase/firestore'
import { logDebug, logEvent } from '../../utils/logHelpers'
import { setStorable, updateStorable } from '../../utils/firestoreHelpers'


/**
 * Given   I am logged in
 *   And   Have a profile
 *   And   A reply is not loved by me
 *         (and, thus) The reply exists
 *  When   I click love on a reply
 *  Then   // The reply is loved visually
 *   And   The reply loved count++
 *   And   The reply is added to my reactions collection
 *
 * @param uid Firebase user UID, with a valid profile data in /database/profiles/{uid}
 * @param threadid The id of a Stream Thread, found in /database/stream/{threadid}
 * @param replyid the id of a reply, of the thread, found in /database/stream/{threadid}/comments/{replyid}
 */
export async function loveReply (
  uid: string, threadKey: string, replyKey: string): Promise<void> {
  // Get the reply
  const db = getFirestore()
  const replyRef = doc(db, 'stream', threadKey, 'comments', replyKey)
  const replyDoc = await getDoc(replyRef)

  if (!replyDoc.exists) {
    throw new Error('state/loveReply, trying to love by a non existing reply' + threadKey + '/' + replyKey)
  }

  const reply = new Reply(replyDoc.data(), replyKey, threadKey)

  const lovesArray:Array<string> = reply.lovers || []

  if (lovesArray.includes(uid)) {
    throw new Error('Can not love a reply, one already loves')
  }

  lovesArray.push(uid)

  logDebug('reply.firestorePath', reply.getFirestorePath())

  logDebug('Updating reply loves count and lovers array client side, should happen cloud side for cIa purposes')
  updateStorable(reply.getFirestorePath(), {
    lovesCount: lovesArray.length + 1, 
    lovers: lovesArray 
  }, { silent: true })

  const reaction = new Reaction()
  reaction.key = replyKey
  reaction.actor = uid
  reaction.targetEntry = Reply.collectionName
  reaction.targetKey = threadKey + '/' + replyKey
  reaction.targetActor = reply.author
  reaction.type = 'love'
  
  setStorable(reaction)

  // Ready to save, log payloads
  logDebug('reactions/loveReply, update(thread/reply)', { lovesCount: lovesArray.length, lovers: lovesArray })
  logDebug('reactions/loveReply, set(profile/reaction)', reaction)
  
  // Log like event to analytics
  logEvent('loveReply', { uid: uid, threadid: threadKey, replyid: replyKey })
}

/**
 * Given   I am logged in
 *   And   Have a profile
 *   And   A reply is loved by me
 *         (and, thus) The reply exists
 *  When   I click love on a reply
 *  Then   // The reply is no longer loved visually
 *   And   The reply loved count--
 *   And   The reply is removed from my reactions collection
 *
 * @param uid Firebase user UID, with a valid profile data in /database/profiles/{uid}
 * @param threadid The id of a Stream Thread, found in /database/stream/{threadid}
 * @param replyid the id of a reply, of the thread, found in /database/stream/{threadid}/comments/{replyid}
 */
export async function unloveReply (uid: string, threadid: string, replyid: string): Promise<void> {
  const db = getFirestore()
  const replyRef = doc(db, 'stream', threadid, 'comments', replyid)

  logEvent('unloveReply', { uid: uid, threadid: threadid, replyid: replyid })

  return runTransaction(db, (transaction: Transaction) => {
    return getDoc(replyRef).then((reply) => {
      if (!reply.exists) {
        throw new Error('state/loveReply, trying to love by a non existing reply' + threadid + '/' + replyid)
      }
      const lovesArr = new Array<string>()
      const lovesDataArr = reply.data()?.lovers
      if (lovesDataArr) {
        if (!(lovesDataArr as Array<string>).includes(uid)) {
          throw new Error('Can not remove love from void')
        }
        (lovesDataArr as Array<string>).forEach((lover: string) => { if (lover !== uid) lovesArr.push(lover) })
      }
      transaction.update(replyRef, { lovesCount: lovesArr.length, lovers: lovesArr })

      const reactionsRef = doc(db, 'profiles', uid, 'reactions', replyid)

      transaction.delete(reactionsRef)
    })
  })
}