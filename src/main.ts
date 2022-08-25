import { createApp } from 'vue'
import App from './App.vue'
import '@11thdeg/cyan/style.css'
import '@11thdeg/cyan'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './views/routes'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fi from './locales/fi.json'

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

app.mount('#app')



// Add Cyan/Charna Theming to body
document.body.classList.add('cyan--themed')
// Force light mode, as dark is still experimental
document.body.classList.add('cyan--mode--light')
