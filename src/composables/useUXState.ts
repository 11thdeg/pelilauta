
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const navTrayVisible= ref(false)
const showNavTrayOnMobile = ref(false)
const fabTrayVisible = ref(false)
const fieldFocused = ref(false)

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

let _init = false
function init () {
  if(_init) return
  _init = true
  const route = useRoute()
  watch(route, () => {
    showNavTrayOnMobile.value = false
  })
  document.addEventListener('cyan-field-focus', () => {
    fieldFocused.value = true
  })
  document.addEventListener('cyan-field-blur', () => {
    fieldFocused.value = false
  })
}


export function useUxState () {
  init()
  return {
    navTrayVisible: computed(() => navTrayVisible.value),
    showNavTrayOnMobile: computed(() => showNavTrayOnMobile.value),
    fabTrayVisible: computed(() => fabTrayVisible.value),
    fieldFocused: computed(() => fieldFocused.value),
    mountNavTray,
    unmountNavTray,
    toggleMobileNavTray,
    mountFabTray,
    unmountFabTray
  }
}