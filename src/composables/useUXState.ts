
import { computed, ref } from 'vue'
import { logDebug } from '../utils/logHelpers'

const navTrayVisible= ref(false)
const showNavTrayOnMobile = ref(false)

function mountNavTray () {
  logDebug('mountNavTray')
  navTrayVisible.value = true
}

function unmountNavTray () {
  navTrayVisible.value = false
}

function toggleMobileNavTray () {
  showNavTrayOnMobile.value = !showNavTrayOnMobile.value
}


export function useUxState () {
  return {
    navTrayVisible: computed(() => navTrayVisible.value),
    showNavTrayOnMobile: computed(() => showNavTrayOnMobile.value),
    mountNavTray,
    unmountNavTray,
    toggleMobileNavTray
  }
}