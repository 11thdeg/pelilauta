import { Account, Profile } from '@11thdeg/skaldstore'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { logEvent } from '../../utils/logHelpers'

export async function register() {
  const user = getAuth().currentUser
  if (!user || user.isAnonymous || !user.uid) throw new Error('Invalid user')

  const db = getFirestore()

  const accountDoc = await getDoc(doc(db, Account.collectionName, user.uid))
  if (accountDoc.exists() && accountDoc.data().eulaAccepted) throw new Error('Account already exists')

  const account = new Account(user)
  //  if (document.body.classList.contains('cyan--mode--dark')) account.lightMode = 'dark'
  // else account.lightMode = 'light'
  account.lightMode = 'dark'
  account.eulaAccepted = true
  await setDoc(doc(db, Account.collectionName, user.uid), account.docData)

  const profileDoc = await getDoc(doc(db, Profile.collectionName, user.uid))
  if (profileDoc.exists()) throw new Error('Profile already exists')

  const profile = new Profile()
  if (user.photoURL) profile.avatarURL = user.photoURL
  if (user.displayName) profile.nick = user.displayName
  await setDoc(doc(db, Profile.collectionName, user.uid), profile.docData)

  logEvent('registration', { uid: user.uid })
}