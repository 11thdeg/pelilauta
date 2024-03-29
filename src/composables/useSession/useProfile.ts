import { Profile } from '@11thdeg/skaldstore'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import { computed, ref, watch } from 'vue'
import { useSession } from '.'
// import { logDebug } from '../../utils/logHelpers'

const _profile = ref<Profile | undefined>(undefined)

let _uid = ''
let _initialized = false
let unsubscribeProfile: undefined | CallableFunction

function initialize () {
  if (_initialized) return
  _initialized = true

  const { uid } = useSession()
  watch(uid, (newUid) => {
    // logDebug('useProfile', 'initialize()', newUid, _uid)
    if (newUid !== _uid) {
      // logDebug('useProfile', 'initialize()', 'newUid !== _uid')
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
          (documentSnapshot) => {
            /* logDebug('useProfile', 
              'initialize()', 
              'onSnapshot', 
              documentSnapshot.id, 
              documentSnapshot.metadata, 
              documentSnapshot.data(),
              documentSnapshot.data()?.nick) */

            documentSnapshot.get
            _profile.value = new Profile(documentSnapshot.data(), documentSnapshot.id)
          }
        )
      }
      _uid = newUid
      // logDebug('useProfile', 'initialize()', 'complete')
    }
  }, {immediate: true})
}

export function useProfile () {
  initialize()
  return {
    nick: computed(() => _profile.value?.nick || ''),
    profile: computed(() => _profile.value)
  }
}
  