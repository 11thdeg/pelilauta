import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'
import LoginView from './LoginView.vue'
import SettingsView from './SettingsView.vue'
import AssetsView from './AssetsView.vue'
import AssetView from './AssetView.vue'

export const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/login', component: LoginView },
  { path: '/settings', component: SettingsView },
  { path: '/assets', component: AssetsView },
  { path: '/assets/:assetkey', component: AssetView, props: true }
]