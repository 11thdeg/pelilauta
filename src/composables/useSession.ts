import { Account, Profile } from "@11thdeg/skaldstore"
import { User } from "firebase/auth"
import { doc, getFirestore, onSnapshot } from "firebase/firestore"
import { ref, computed } from "vue"
import { logDebug, logError } from "../utils/logHelpers"

// Set to true, if the session is active
const active = ref(true)
const uid = ref('')
// If firebase session has started, and we do not have an uid: the user is anonymous
const anonymous = computed(() => active.value && !uid.value)


const profile = ref(new Profile())
const account = ref(new Account(null))

let unsubscribeAccount:undefined|CallableFunction

function reset () {
  logDebug("useSession", "reset()")
  // Setting uid to ==false will trigger the anonymous computed property
  uid.value = ''

  // Stop subscribing Account data and erase account data
  unsubscribeAccount && unsubscribeAccount()
  account.value = new Account(null)

  profile.value = new Profile()

  // Finally set session state inactive
  active.value = false
}

function subscribeToAccount () {
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

export function login(user: User|null) {
  logDebug("useSession", "login", user)
  reset()
  if (user === null || user.isAnonymous ) {
    active.value = true
  }
  else {
    anonymous.value = false
    active.value = true
    uid.value = user.uid
    account.value = new Account(user)
    subscribeToAccount()
    logError("useSession", "login", "Not implemented for actual users")
    account.value = new Account(user)
    profile.value = new Profile()
  }
}

export function useSession () {
  return {
    active: computed(() => active.value),
    anonymous: computed(() => anonymous.value),
    profile: computed(() => profile.value),
    account: computed(() => account.value)
  }
}