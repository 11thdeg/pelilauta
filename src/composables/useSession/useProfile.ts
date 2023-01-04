import { Profile } from '@11thdeg/skaldstore'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import { computed, ref, watch } from 'vue'
import { useSession } from '.'
import { logDebug } from '../../utils/logHelpers'

const _profile = ref<Profile | undefined>(undefined)

let _uid = ''
let _initialized = false
let unsubscribeProfile: undefined | CallableFunction

function initialize () {
  if (_initialized) return
  _initialized = true

  logDebug('useProfile', 'initialize()')

  const { uid } = useSession()
  watch(uid, (newUid) => {
    if (newUid !== _uid) {
      unsubscribeProfile && unsubscribeProfile()
      if (!newUid) {
        _profile.value = undefined
      }
      else {
        unsubscribeProfile = onSnapshot(
          doc(
            getFirestore(), 
            Profile.collectionName, 
            uid.value),
          (snapshot) => {
            if (snapshot.exists()) {
              _profile.value = new Profile(snapshot.data(), snapshot.id)
            } else {
              _profile.value = undefined
            }
          }
        )
      }
      _uid = newUid
    }
  }, {immediate: true})
}

export function useProfile () {
  initialize()
  return { profile: computed(() => _profile.value)}
}
  