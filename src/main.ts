import { createApp } from 'vue'
import App from './App.vue'
import '@11thdeg/cyan/style.css'

createApp(App).mount('#app')

// Add Cyan/Charna Theming to body
document.body.classList.add('cyan--themed')
