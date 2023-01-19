import { Profile } from '@11thdeg/skaldstore'
import { doc, getFirestore, getDoc, collection, getDocs, DocumentData } from '@firebase/firestore'
import { computed } from 'vue'

function getStoredProfile (key: string) {
  const stored = localStorage.getItem('profiles-'+key)
  if (stored) {
    const raw = JSON.parse(stored)
    return new Profile(raw as DocumentData)
  }
  return undefined
}
function storeProfile (profile: Profile) {
  const key = 'profiles-'+profile.key
  const data = JSON.stringify(profile.docData)
  localStorage.setItem(key, data)
}

const profileCache = new Map<string, Profile>()

export async function fetchProfile (uid: string, options?: { reload: boolean }): Promise<Profile|undefined> {

  const useCache = options?.reload !== true

  if (useCache) {
    const cached = profileCache.get(uid)
    if (cached) return cached

    const stored = getStoredProfile(uid)
    if (stored) {
      profileCache.set(uid, stored)
      return stored
    }
  }
  
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
    storeProfile(ac)
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
