import { Profile } from '@11thdeg/skaldstore'
import { doc, getFirestore, getDoc, collection, getDocs } from '@firebase/firestore'
import { computed } from 'vue'

const profileCache = new Map<string, Profile>()

export async function fetchProfile (uid: string): Promise<Profile|undefined> {
  const cached = profileCache.get(uid)
  if (cached) return cached

  const authorDoc = await getDoc(
    doc(
      getFirestore(),
      'profiles',
      uid
    )
  )

  if (authorDoc.exists()) {
    const ac = new Profile(authorDoc.data(), uid)
    profileCache.set(uid, ac)
    return ac
  }

  return undefined
}

let _doNotRepeat = false
async function fetchAll () {
  if (_doNotRepeat) return
  _doNotRepeat = true

  const profiles = await getDocs(
    collection(
      getFirestore(),
      Profile.collectionName
    )
  )

  profiles.forEach((profileDoc) => {
    const ac = new Profile(profileDoc.data(), profileDoc.id)
    profileCache.set(profileDoc.id, ac)
  })
}

export function useProfiles () {
  return {
    fetchAll,
    fetchProfile,
    cached: computed(() => profileCache)
  }
}
