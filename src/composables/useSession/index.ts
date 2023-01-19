import { Account, Profile } from '@11thdeg/skaldstore'
import { getAuth, User } from 'firebase/auth'
import { doc, getFirestore, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
import { ref, computed } from 'vue'
import { logDebug, logError } from '../../utils/logHelpers'
import { useMeta } from '../useMeta'
import { useSubscriber } from './useSubscriber'
import { subscribeNotifications } from './useNotifications'
import { useProfile } from './useProfile'

export * from './register'

// Set to true, if the session is active
const active = ref(false)
const uid = ref('')
const accountLoaded = ref(false)
const anonymous = computed(() => !uid.value)

const profile = ref(new Profile())
const account = ref(new Account(null))

let unsubscribeAccount:undefined|CallableFunction
let unsubscribeProfile:undefined|CallableFunction

function reset () {
  logDebug('useSession', 'reset()', active.value)

  if (active.value) {
    // Setting uid to ==false will trigger the anonymous computed property
    uid.value = ''

    // Stop subscribing Account data and erase account data
    unsubscribeAccount && unsubscribeAccount()
    account.value = new Account(null)

    // Stop subscribing Profile data and erase profile data
    unsubscribeProfile && unsubscribeProfile()
    profile.value = new Profile()

    // Reset the session
    resetters.forEach((value, key) => {
      value()
      resetters.delete(key)
    })
    // Set session state inactive for suspended components
    active.value = false
  }

  
}

async function subscribeToAccount () {
  accountLoaded.value = false
  // logDebug('useSession', 'subscribeToAccount()')
  unsubscribeAccount = onSnapshot(
    doc(getFirestore(), 'account', uid.value),
    (snapshot) => {
      if (snapshot.exists()) {
        account.value.docData = snapshot.data()
        if (account.value.lightMode === 'light') {
          // logDebug('useSession', 'login', 'Setting light mode')
          document.body.classList.remove('cyan--mode--dark')
          document.body.classList.add('cyan--mode--light')
        } else if (account.value.lightMode === 'dark') {
          // logDebug('useSession', 'login', 'Setting dark mode')
          document.body.classList.remove('cyan--mode--light')
          document.body.classList.add('cyan--mode--dark')
        }
      }
      accountLoaded.value = true
    }
  )
}

async function subscribeToProfile () {
  // logDebug('useSession', 'subscribeToProfile()')
  unsubscribeProfile = onSnapshot(
    doc(getFirestore(), 'profiles', uid.value),
    (snapshot) => {
      if (snapshot.exists()) {
        profile.value = new Profile(snapshot.data())
      }
    })
}

export function login(user: User|null) {
  // logDebug('useSession', 'login', user)
  reset()
  if (user === null || user.isAnonymous ) {
    active.value = true
  }
  else {
    uid.value = user.uid
    account.value = new Account(user)
  
    subscribeToAccount()
    subscribeToProfile()
    useSubscriber()
    subscribeNotifications(uid.value)
    useProfile()
    
    active.value = true
    updateDoc(doc(getFirestore(), Account.collectionName, uid.value), { lastLogin: serverTimestamp() })
  }
}


const resetters:Map<string, CallableFunction> = new Map()

export function addStore(name: string, resetter: () => void) {
  // logDebug('useSession', 'Added a store reset method', name)
  resetters.set(name, resetter)
}

export async function logout() {
  const auth = getAuth()
  await auth.signOut()
}

function updateProfile(field: string, value:string) {
  if (!active.value) throw new Error('Session is not active')
  if (anonymous.value) throw new Error('Anonymous users can not update their profile')
  logDebug('useSession', 'updateProfile', field, value)
  if (field in profile.value && typeof profile.value.docData[field] === typeof value) {
    updateDoc(doc(getFirestore(), 'profiles', uid.value), { field: value })
  } else {
    logError('useSession', 'updateProfile', 'Field does not exist or type does not match', field, value)
  }
}

const admin = computed(() => {
  const { admins } = useMeta()
  return admins.value.includes(uid.value)
})

const frozen = computed(() => {
  const { frozen: frozens } = useMeta()
  return frozens.value.includes(uid.value)
})

export function setMode(mode: string) {
  if (!active.value) throw new Error('Session is not active')
  if (anonymous.value) throw new Error('Anonymous users can not update their profile')
  logDebug('useSession', 'setMode', mode)
  updateDoc(doc(getFirestore(), Account.collectionName, uid.value), { lightMode: mode })
}

export function useSession () {
  return {
    active: computed(() => active.value),
    anonymous: computed(() => anonymous.value),
    profile: computed(() => profile.value),
    account: computed(() => account.value),
    updateProfile,
    admin,
    frozen,
    uid: computed(() => account.value.uid),
    eulaMissing: computed(() => 
      accountLoaded.value &&
      !anonymous.value && 
      !account.value.updatedAt
    ) // eula has to be agreed, before updating account for the first time
  }
}