<script setup lang="ts">
import NavigationRail from './components/NavigationRail/NavigationRail.vue'
import SnackBar from './components/ui/SnackBar.vue'
import { useUxState } from './composables/useUXState'
import EulaDialog from './components/account/EulaDialog.vue'
import NavigationBar from './components/NavigationBar/NavigationBar.vue'
import { useSession, setMode } from './composables/useSession'
import { onMounted } from 'vue'
import { logDebug } from './utils/logHelpers'
import { useBanner } from './composables/useBanner'
import { Workbox } from 'workbox-window'
import { useI18n } from 'vue-i18n'
import SessionCard from './components/admin/SessionCard/SessionCard.vue'

const { navTrayVisible } = useUxState()
const { anonymous } = useSession()
const { raise } = useBanner()
const { t } = useI18n()

onMounted(() => {
  if (!anonymous.value) {
    document.addEventListener('cyan-mode-dark', () => {
      logDebug('Account settings: dark mode on')
      setMode('dark')
    })
    document.addEventListener('cyan-mode-light', () => {
      logDebug('Account settings: light mode on')
      setMode('light')
    })
  }
})

// *** Workbox/Service worker setup starts ******************************
// let skipWaiting: CallableFunction|undefined
if ('serviceWorker' in navigator) {
  const workbox = new Workbox('/service-worker.js')
  const skipWaiting = () => {
    console.debug('App.js skipwaiting called')
    workbox.addEventListener('controlling', (event) => {
      console.debug('controlling', event)
      window.location.reload()
    })
    workbox.messageSkipWaiting()
  }
  workbox.addEventListener('waiting', (event) => {
    console.debug('WorkboxEvent', event.type)
    raise(t('banner.updatesAvailable'), skipWaiting)
  })
  // WB debugs
  workbox.addEventListener('message', (event) => { logDebug('WorkboxEvent', event) })
  workbox.addEventListener('installed', (event) => { logDebug('WorkboxEvent', event) })
  workbox.addEventListener('controlling', (event) => { logDebug('WorkboxEvent', event) })
  workbox.addEventListener('activated', (event) => { logDebug('WorkboxEvent', event) })
  workbox.addEventListener('redundant', (event) => { logDebug('WorkboxEvent', event) })
  workbox.register()
}
// *** Workbox/Service worker setup ends ********************************
</script>

<template>
  <NavigationRail />
  <div
    id="appContainer"
    class="AppLayout"
    :class="{ navTrayVisible: navTrayVisible }"
    style="container: none"
  >
    <router-view />
  </div>
  <EulaDialog />
  <SnackBar />
  <NavigationBar />
  <SessionCard />
</template>

<style lang="sass" scoped>
@media screen and (min-width: 600px)
  div#appContainer
    position: relative
    min-height: 100vh
    &.navTrayVisible
      margin-left: calc(80px + 256px)
</style>

