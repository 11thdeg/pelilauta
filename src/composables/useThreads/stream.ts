/**
 * This module is a submodule of useThreads. It contains the functions that
 * handle the stream of threads presented in the front page of the site.
 */

import { Thread } from '@11thdeg/skaldstore'
import { collection, getFirestore, limit, onSnapshot, query, where, orderBy } from '@firebase/firestore'
import { Ref } from 'vue'
import { logEvent } from '../../utils/logHelpers'

// The number of threads to fetch from the stream initially
const THREAD_LIMIT = 5

let unsubscribeThreads: CallableFunction|undefined = undefined

export async function subscribeStream(threadCache: Ref<Map<string, Thread>>, loading: Ref<boolean>) {
  if(unsubscribeThreads) unsubscribeThreads()
  unsubscribeThreads = onSnapshot(
    query(
      collection(
        getFirestore(),
        Thread.collectionName
      ),
      limit(THREAD_LIMIT),
      where('public', '==', true),
      orderBy('flowTime', 'desc')
    ),
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (loading.value) loading.value = false
        if(change.type === 'removed') {
          threadCache.value.delete(change.doc.id)
        } else {
          threadCache.value.set(change.doc.id, new Thread(change.doc.data(), change.doc.id))
        }
      })
    }
  )
  logEvent('stream', {action: 'subscribed', where: 'public'})
}

export function unsubscribeStream() {
  if(unsubscribeThreads) unsubscribeThreads()
}