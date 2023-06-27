import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'
import LoginView from './LoginView.vue'

export const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/account/delete', component: () => import('./account/DeleteAccountView.vue') }, 
  { path: '/admin/settings', component: () => import('./admin/SiteSettings.vue') },
  { path: '/admin/testing-tools', component: () => import('./admin/TestingTools.vue') },
  { path: '/admin/users', component: () => import('./admin/AdminUsersView.vue') },
  { path: '/admin/sandbox', component: () => import('./admin/EditorSandbox.vue') }, // -->
  { path: '/inbox', component: () => import('./InboxView.vue') },
  { path: '/login', component: LoginView },
  { path: '/login/:backroute', component: LoginView, props: true }, 
  { path: '/settings', component: () => import('./SettingsView.vue') },
  { path: '/assets', component: () => import('./assets/UserAssetsView.vue') },
  { path: '/assets/:assetkey', component: () => import('./assets/AssetView.vue'), props: true },
  { path: '/assets/:assetkey/delete', component: () => import('./assets/DeleteAssetView.vue'), props: true },
  { path: '/profiles/:uid', component: () => import('./ProfileView.vue'), props: true }, 
  
  // Views related to tags and tag management
  { 
    path: '/tags/:tagkey',
    component: () => import('./tags/TagView.vue'),
    props: true
  },

  { path: '/threads/:threadkey', component: () => import('./threads/ThreadView.vue'), props: true },
  { path: '/threads/:threadkey/from/:flowtime', component: () => import('./threads/ThreadView.vue'), props: true },
  { path: '/threads/:threadkey/edit', component: () => import('./threads/EditThreadView.vue'), props: true },
  { path: '/threads/:threadkey/replies/:replykey', component: () => import('./threads/ThreadView.vue'), props: true }, 
  { path: '/threads/:threadkey/delete', component: () => import('./threads/ConfirmThreadDeletionView.vue'), props: true },
  { path: '/streams/', component: () => import('./threads/StreamView.vue') },
  { path: '/streams/:streamkey', component: () => import('./threads/StreamView.vue'), props: true },
  { path: '/streams/:streamkey/add/thread', component: () => import('./threads/CreateThreadView.vue'), props: true },
  { path: '/sites', component: () => import('./sites/SitesHomeView.vue') },
  { path: '/sites/:sitekey', component: () => import('./sites/SiteView.vue'), props: true },
  { path: '/sites/:sitekey/edit', component: () => import('./sites/EditSiteView.vue'), props: true },
  { path: '/sites/:sitekey/keeper', component: () => import('./sites/EditSiteUsersView.vue'), props: true },
  { path: '/sites/:sitekey/remove', component: () => import('./sites/DeleteSiteView.vue'), props: true },
  { path: '/sites/:sitekey/add/page', component: () => import('./pages/CreatePageView.vue'), props: true },
  { path: '/sites/:sitekey/add/page/:pagekey', component: () => import('./pages/CreatePageView.vue'), props: true },
  { path: '/sites/:sitekey/pages/:pagekey/edit', component: () => import('./pages/EditPageView.vue'), props: true },
  { path: '/sites/:sitekey/pages/:pagekey/move', component: () => import('./pages/MovePageView.vue'), props: true },
  { path: '/sites/:sitekey/pages/:pagekey', component: () => import('./pages/PageView.vue'), props: true },
  { path: '/sites/:sitekey/pages/:pagekey/delete', component: () => import('./sites/DeletePageView.vue'), props: true },
  { path: '/sites/:sitekey/pages/:pagekey/revisions', component: () => import('./pages/PageHistoryView.vue'), props: true },
  { path: '/add/site', component: () => import('./sites/AddSiteView.vue') },
  { path: '/add/thread', component: () => import('./threads/CreateThreadView.vue') },
  { path: '/library/', component: () => import('./assets/UserAssetsView.vue'), props: true },
  { path: '/library/games', component: () => import('./library/UserGamesView.vue'), props: true }

]