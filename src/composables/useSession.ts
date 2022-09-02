import { Account, Profile } from "@11thdeg/skaldstore"
import { getAuth, User } from "firebase/auth"
import { doc, getFirestore, onSnapshot } from "firebase/firestore"
import { ref, computed } from "vue"
import { logDebug, logError } from "../utils/logHelpers"

// Set to true, if the session is active
const active = ref(false)
const uid = ref('')
// If firebase session has started, and we do not have an uid: the user is anonymous
const anonymous = computed(() => active.value && !uid.value)

const profile = ref(new Profile())
const account = ref(new Account(null))

let unsubscribeAccount:undefined|CallableFunction
let unsubscribeProfile:undefined|CallableFunction

function reset () {
  logDebug("useSession", "reset()")
  // Set session state inactive for suspended components
  active.value = false

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
}

async function subscribeToAccount () {
  logDebug("useSession", "subscribeToAccount()")
  unsubscribeAccount = onSnapshot(
    doc(getFirestore(), 'account', uid.value),
    (snapshot) => {
      if (snapshot.exists()) {
        account.value.docData = snapshot.data()
      }
    }
  )
}

async function subscribeToProfile () {
  logDebug("useSession", "subscribeToProfile()")
  unsubscribeProfile = onSnapshot(
    doc(getFirestore(), 'profiles', uid.value),
    (snapshot) => {
      if (snapshot.exists()) {
        profile.value = new Profile(snapshot.data())
      }
    })
}

export function login(user: User|null) {
  logDebug("useSession", "login", user)
  reset()
  if (user === null || user.isAnonymous ) {
    active.value = true
  }
  else {
    uid.value = user.uid
    account.value = new Account(user)
    subscribeToAccount()
    subscribeToProfile()
    logError("useSession", "login", "Not implemented for actual users")
    account.value = new Account(user)
    active.value = true
  }
}


const resetters:Map<string, CallableFunction> = new Map()

export function addStore(name: string, resetter: () => void) {
  logDebug("useSession", "addStore", name, resetter)
  resetters.set(name, resetter)
}

export async function logout() {
  const auth = getAuth()
  await auth.signOut()
}

export function useSession () {
  return {
    active: computed(() => active.value),
    anonymous: computed(() => anonymous.value),
    profile: computed(() => profile.value),
    account: computed(() => account.value)
  }
}