import { getAuth } from 'firebase/auth'
import { getMessaging, getToken } from 'firebase/messaging'
import { useSubscriber } from '../../composables/useSubscriber'
import { logDebug } from '../logHelpers'

export async function toggleMessagingPermission(value: boolean) {
  if (value) {
    const auth = getAuth()
    const uid = auth.currentUser?.uid

    if(!uid) throw new Error('Can not toggle messaging permission without a user id')

    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      const messaging = getMessaging()
      const currentToken = await getToken(messaging, { vapidKey: 'BGn1n6TRKH8lkNAtTF4YXivyVSZz9T0Gtoj5fTdO1QpH6x97opp6VZ0qOMQDOa5WUwMFlKGqDrl-UPiUftxeit0' })
      if (currentToken) {
        const { addMessagingToken } = useSubscriber()
        // We'll simply add the token to the user's document in Firestore, the addMessagingToken will splice 
        // that in if it's not already there
        addMessagingToken(currentToken)
      } else {
        logDebug('No registration token available.')   
      }
    } else {
      logDebug('Unable to get permission to notify.')
    }
  }
}
