import { Storable, Account, Thread, Page } from '@11thdeg/skaldstore'
import { addDoc, collection, doc, DocumentData, getFirestore, setDoc, updateDoc } from '@firebase/firestore'
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

/**
 * Updates a Firestore storable at the given path.
 * 
 * This is the current mechanism for updating a storable. Other mechanisms 
 * will be deprecated.
 * 
 * @param s storable with valid path, or path to a storable.
 * @param docdata optional document data to update, if a path is provided instead of a storable
 */
export async function updateStorable(s: Storable|string[], docdata?: DocumentData) {
  const path = Array.isArray(s) ? s : s.getFirestorePath()
  const data = Array.isArray(s) ? docdata : s.docData
  if (typeof data === 'undefined') throw new Error('No data provided to updateStorable')
  await updateDoc(
    doc(
      getFirestore(),
      path.join('/')
    ),
    data
  )
  return path[path.length - 1]
}

/**
 * Sets a Firestore storable at the given path.
 * 
 * This is the current mechanism for setting a storable. Other 
 * mechanisms will be deprecated.
 * 
 * @param s storable with valid path, or path to a storable.
 * @param docdata optional document data to set, if a path is provided instead of a storable
 * 
 * @returns key of the storable
 */
export async function setStorable(s: Storable|string[], docdata?: DocumentData) {
  const data = Array.isArray(s) ? docdata : s.docData
  const path = Array.isArray(s) ? s : s.getFirestorePath()
  await setDoc(
    doc(
      getFirestore(),
      path.join('/')
    ),
    data
  )
  // Last item in path has to be the key of the storable, for the promise above to work
  return path[path.length - 1]
}

export async function store(e: Storable, opts: { silent?: boolean } = {} ) {

  const data = e.docData
  if (opts.silent) {
    delete data.updatedAt
    delete data.createdAt
    delete data.flowTime
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
