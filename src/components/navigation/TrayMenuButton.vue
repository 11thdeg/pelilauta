<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useUxState } from '../../composables/useUXState'
import { logDebug } from '../../utils/logHelpers'

const { navTrayVisible, toggleMobileNavTray, showNavTrayOnMobile } = useUxState()

const active = ref(false)

function onActiveStateChange (detail: boolean) {
  active.value = detail
  logDebug('TrayMenuButton', 'onchange', detail)
  toggleMobileNavTray()
}

watch(showNavTrayOnMobile, (val:boolean) => {
  active.value = val
})

</script>

<template>
  <cyan-hamburger-button
    v-if="navTrayVisible"
    id="TrayMenuButton"
    class="onlyOnMobile"
    :active="active"
    @active="onActiveStateChange($event.detail)"
  />
</template>

<style lang="sass" scoped>
#TrayMenuButton
  position: fixed
  top: 2px
  left: 2px
  z-index: 100000
  transition: all 300ms ease-in-out
  &[active]
    left: calc(100vw - 84px)
    box-shadow: 0 0 12px -2px rgba(0, 33, 55, 1)
</style>