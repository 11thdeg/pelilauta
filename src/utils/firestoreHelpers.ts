import { Storable, Account } from '@11thdeg/skaldstore'
import { addDoc, collection, doc, getFirestore, updateDoc } from '@firebase/firestore'

function getCollectionName(e: Storable) {
  const storableClass = e.constructor.name
  switch (storableClass) {
  case 'Account': return Account.collectionName
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