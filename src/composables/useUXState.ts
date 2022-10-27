
import { computed, ref } from 'vue'

const navTrayVisible= ref(false)
const showNavTrayOnMobile = ref(false)
const fabTrayVisible = ref(false)

function mountNavTray () {
  navTrayVisible.value = true
}

function unmountNavTray () {
  navTrayVisible.value = false
}

function toggleMobileNavTray () {
  showNavTrayOnMobile.value = !showNavTrayOnMobile.value
}

function mountFabTray () {
  fabTrayVisible.value = true
}
function unmountFabTray () {
  fabTrayVisible.value = false
}

export function useUxState () {
  return {
    navTrayVisible: computed(() => navTrayVisible.value),
    showNavTrayOnMobile: computed(() => showNavTrayOnMobile.value),
    fabTrayVisible: computed(() => fabTrayVisible.value),
    mountNavTray,
    unmountNavTray,
    toggleMobileNavTray,
    mountFabTray,
    unmountFabTray
  }
}