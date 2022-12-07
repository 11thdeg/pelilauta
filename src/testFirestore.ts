import { Thread } from '@11thdeg/skaldstore'
import { collection, getDocs, getFirestore, limit, query } from 'firebase/firestore'
import { logDebug, logError } from './utils/logHelpers'

export async function testFirestore () {
  try {
    logDebug('Testing Firestore connection')
    const q = query(
      collection(
        getFirestore(),
        Thread.collectionName
      ),
      limit(1)
    )
    const docs = await getDocs(q)

    logDebug(docs.size)

    docs.forEach(doc => {
      logDebug(doc.id, ' => ', doc.data())
    })
  } catch (error) {
    logError(error)
  }
}