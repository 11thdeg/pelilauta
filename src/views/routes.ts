import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'
import LoginView from './LoginView.vue'
import SettingsView from './SettingsView.vue'
import AssetsView from './AssetsView.vue'
import AssetView from './AssetView.vue'
import ProfileView from './ProfileView.vue'
import ThreadView from './threads/ThreadView.vue'
import StreamView from './threads/StreamView.vue'

export const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/login', component: LoginView },
  { path: '/settings', component: SettingsView },
  { path: '/assets', component: AssetsView },
  { path: '/assets/:assetkey', component: AssetView, props: true },
  { path: '/profiles/:uid', component: ProfileView, props: true },
  { path: '/threads/:threadkey', component: ThreadView, props: true },
  { path: '/streams/:streamkey', component: StreamView, props: true }
]