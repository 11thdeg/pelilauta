// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyCdlJmkgCwL6VjAYRF6Y3FyhCmUWewU_PA',
  authDomain: 'skaldbase.firebaseapp.com',
  databaseURL: 'https://skaldbase.firebaseio.com',
  projectId: 'skaldbase',
  storageBucket: 'skaldbase.appspot.com',
  messagingSenderId: '161233573033',
  appId: '1:161233573033:web:a3f99255d43472d922c5b8',
  measurementId: 'G-X19LQVS8Y2'
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  // Message format is
  // data: {
  //  url: `https://pelilauta.web.app/threads/${threadId}`,
  //  title,
  //  body
  //},

  const notificationTitle = payload.data.title

  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    data: { 
      url:payload.data.click_action 
    }, //the url which we use below
    actions: [{
      action: 'open_url', 
      title: 'Lue lisää'
    }]
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

function handleNotificationClick(event) {
  event.notification.close();

  switch(event.action){
  case 'open_url':
    openUrl(event.notification.data.url) //which we got from above
    break
  default:
    openUrl('https://pelilauta.web.app/')
    break
  }
}

self.addEventListener('notificationclick', handleNotificationClick)

