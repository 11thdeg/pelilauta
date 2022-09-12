import { Profile } from '@11thdeg/skaldstore'
import { doc, getFirestore, getDoc } from '@firebase/firestore'

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
