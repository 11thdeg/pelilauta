import { createApp } from 'vue'
import App from './App.vue'
import '@11thdeg/cyan/style.css'
import '@11thdeg/cyan'
import './styles.css'
import 'animate.css'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './views/routes'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fi from './locales/fi.json'
import { firebaseConfig } from './firebaseConfig'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { login } from './composables/useSession'
// import { testFirestore } from './testFirestore'
// import { testStorage } from './testStorage'

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

const i18n = createI18n({
  legacy: false,
  locale: 'fi',
  fallbackLocale: 'fi',
  messages: {
    en: en,
    fi: fi
  }
})
  
const app = createApp(App)
app.use(i18n)
app.use(router)

const fb = initializeApp(firebaseConfig)
const auth = getAuth(fb)
enableIndexedDbPersistence(getFirestore(fb))

// Initialize Analytics
getAnalytics(fb)

onAuthStateChanged(auth, (user: User|null) => {
  login(user)
})

app.mount('#app')

// Add Cyan/Charna Theming to body
document.body.classList.add('cyan--themed')
// Force dark mode, as light is still experimental
document.body.classList.add('cyan--mode--dark')

// Test firebase storage connection
// testStorage()

// Test firestore connection
// testFirestore()
