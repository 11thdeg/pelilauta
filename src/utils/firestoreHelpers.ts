import { Storable, Account, Thread, Page } from '@11thdeg/skaldstore'
import { addDoc, collection, doc, DocumentData, getDoc, getFirestore, setDoc, updateDoc } from '@firebase/firestore'
import { logDebug } from './logHelpers'
import { productionLogConfig } from '../config'

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
 * Fetch a storable from the Firestore database. returns null if not found.
 * 
 * @param {string[]} path path to the storable, including the collection name(s)
 */
export async function fetchStorable(path: string[]) {
  logDebug('fetchStorable', path)
  const docRef = doc(
    getFirestore(),
    path.join('/')
  )
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) return null
  return docSnap.data()
}

/**
 * Add a new Storable to the Firestore database.
 */ 
export async function addStorable(e: Storable, opts: { key?: string } = {}) {
  const path = e.getFirestorePath()
  const collectionName = path.shift()
  if (!collectionName) throw new Error('No root collection name found in path')
  logDebug('addStorable', e, path, collectionName)

  if (opts.key) {
    // check if the key exists, abort if it does
    const p = path
    p.push(opts.key as string)
    const docRef = doc(
      getFirestore(),
      collectionName,
      ...p
    )
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) throw new Error('Key already exists')

    // Create using setDoc
    await setDoc(
      docRef,
      e.docData
    )

    return opts.key
  }

  // Create using addDoc
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
export async function updateStorable(s: Storable|string[], docdata?: DocumentData, opts: { silent?: boolean } = {}) {
  const path = Array.isArray(s) ? s : s.getFirestorePath()
  const data = docdata || (Array.isArray(s) ? undefined : s.docData)

  if (productionLogConfig.components.includes('firestore')) 
    logDebug('updateStorable', path, data)

  if (!data) throw new Error('No data provided to updateStorable')

  if (opts.silent) {
    delete data.updatedAt
    delete data.createdAt
    delete data.flowTime
  }

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
