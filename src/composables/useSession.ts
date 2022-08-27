import { Account, Profile } from "@11thdeg/skaldstore"
import { User } from "firebase/auth"
import { ref, computed } from "vue"
import { logDebug, logError } from "../utils/logHelpers"

// Set to true, if the session is active
const active = ref(true)
// TODO: needs to be computed from the session
const anonymous = ref(true)

const profile = ref(new Profile())
const account = ref(new Account(null))

export function login(user: User|null) {
  logDebug("useSession", "login", user)
  if (user === null || user.isAnonymous ) {
    anonymous.value = true
    active.value = true
    account.value = new Account(null)
    profile.value = new Profile()
  }
  else {
    anonymous.value = false
    active.value = true
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