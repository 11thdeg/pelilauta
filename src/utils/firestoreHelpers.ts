import { Storable, Account, Thread } from '@11thdeg/skaldstore'
import { addDoc, collection, doc, getFirestore, updateDoc } from '@firebase/firestore'
import { logDebug } from './logHelpers'

function getCollectionName(e: Storable) {
  logDebug('getCollectionName', e)
  const storableClass = e.constructor.name
  switch (storableClass) {
  case 'Account': return Account.collectionName
  case 'Thread': return Thread.collectionName
  }
  return Storable.collectionName
}

export async function store(e: Storable) {
  if (e.key) {
    // update!
    await updateDoc(
      doc(
        getFirestore(),
        getCollectionName(e),
        e.key
      ),
      e.docData
    )
  } else {
    // create!
    const r = await addDoc(
      collection(
        getFirestore(),
        getCollectionName(e)
      ),
      e.docData
    )
    return r.id
  }
}