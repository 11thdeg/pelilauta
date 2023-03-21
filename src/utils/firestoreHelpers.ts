import { Storable, Account, Thread, Page } from '@11thdeg/skaldstore'
import { addDoc, collection, doc, DocumentData, getFirestore, updateDoc } from '@firebase/firestore'
import { logDebug } from './logHelpers'

function getCollectionName(e: Storable) {
  logDebug('getCollectionName', e)
  const storableClass = e.constructor.name
  switch (storableClass) {
  case 'Account': return Account.collectionName
  case 'Thread': return Thread.collectionName
  case 'Page': return Page.collectionName
  }
  return Storable.collectionName
}

/**
 * Add a new Storable to the Firestore database.
 */ 
export async function addStorable(e: Storable) {
  const path = e.getFirestorePath()
  const collectionName = path.shift()
  if (!collectionName) throw new Error('No root collection name found in path')
  logDebug('addStorable', e, path, collectionName)
  const r = await addDoc(
    collection(
      getFirestore(),
      collectionName,
      ...path
    ),
    e.docData
  )
  return r.id
}

async function updateStorable(path: string[], data: DocumentData) {
  logDebug('updateStorable', path, data)
  return updateDoc(
    doc(
      getFirestore(),
      path.join('/')
    ),
    data
  )
}

export async function store(e: Storable, opts: { silent?: boolean } = {} ) {

  const data = e.docData
  if (opts.silent) {
    delete data['updatedAt']
    delete data['createdAt']
  }

  if (e.getFirestorePath().length > 0 && e.key) return updateStorable(e.getFirestorePath(), data)

  logDebug('Legacy store mechanism for', getCollectionName(e), e.key)

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
