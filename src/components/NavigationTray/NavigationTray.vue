<script lang="ts" setup>
// This component is responsible for the "second level navigatio" of both Mobile and Tablet/Desktop
// We do use the uxState (via useUxState) to relay information about the visibility of the tray on both viewmodes
// and to listen to hide/show -trat hamburger on the Mobile
import { computed, onMounted, onUnmounted } from 'vue'
import { useUxState } from '../../composables/useUXState'
const uxState = useUxState()
onMounted(() => {
  uxState.mountNavTray()
})
onUnmounted(() => {
  uxState.unmountNavTray()
})
const showTrayOnMobile = computed(() => uxState.showNavTrayOnMobile.value)
</script>

<template>
  <nav
    id="NavigationTray"
    :class="{
      hideOnMobile: !showTrayOnMobile
    }"
  >
    <div
      id="NavigationTrayMobileOverlay"
      class="onlyOnMobile"
      @click="uxState.toggleMobileNavTray()"
    />
    <div
      id="TrayContainer"
      :class="{ active: showTrayOnMobile, 'rise-b': showTrayOnMobile }"
    >
      <slot />
    </div>
  </nav>
</template>

<style lang="sass" scoped>
#NavigationTray
  position: fixed
  top: 0
  left: 80px
  width: 240px
  height: 100vh
  margin: 0
  padding: 8px 0
  box-sizing: border-box
  overflow-y: scroll
  scroll-bar-width: none
  &::-webkit-scrollbar
    display: none
@media screen and (max-width: 600px)
  #NavigationTray
    left: 0
    top: 0
    margin: 0
    padding: 0
    border-right: none
    z-index: 90000
    pointer-events: none
    &:active
      pointer-events: all
    #NavigationTrayMobileOverlay
      position: fixed
      top: 0
      left: 0
      width: 100vw
      height: 100vh
      background-color: rgba(#227286, 0.44)
      pointer-events: all
      -webkit-backdrop-filter: blur(1px)
      backdrop-filter: blur(1px)
    #TrayContainer
      position: fixed
      top: 0
      left: 0
      width: calc(100vw - 80px)
      height: calc(100vh - 24px)
      overflow-y: scroll
      box-model: border-box
      padding: 12px 16px
      pointer-events: all
      box-shadow: 0px 0px 48px 0px var(--chroma-secondary-a)
      transform: translateX(-300px)
      transition: all 0.3s ease-in-out
      opacity: 0
      &.active
        opacity: 1
        transform: translateX(0)
        transition: all 0.3s ease-in-out
      &::-webkit-scrollbar
        display: none
      
      
</style>