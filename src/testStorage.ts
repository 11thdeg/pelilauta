import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { logDebug, logError } from './utils/logHelpers'

export async function testStorage() {
  try {
    logDebug('Testing Storage connection')
    const storage = getStorage()
    logDebug('Got storage')
    const storageRef = ref(storage, '/example.png')
    logDebug('Got ref')
    const url = await getDownloadURL(storageRef)
    logDebug('Got url', url)
  } catch (error) {
    logError(error)
  }  
}