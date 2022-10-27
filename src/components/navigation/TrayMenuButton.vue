<script lang="ts" setup>
import { ref } from 'vue'
import { useUxState } from '../../composables/useUXState'

const { navTrayVisible, toggleMobileNavTray } = useUxState()

const open = ref(false)
function onclick() {
  open.value = !open.value
  toggleMobileNavTray()
}


</script>

<template>
  <div
    v-if="navTrayVisible"
    id="TrayMenuButton"
    class="onlyOnMobile"
    :class="{ active: open }"
    @click.prevent="onclick"
  >
    <div class="hamburger">
      <div class="bar" />
      <div class="bar" />
      <div class="bar" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
#TrayMenuButton
  height: 36px
  width: 36px
  padding: 7px 6px
  box-sizing: border-box
  border-radius: 50%
  background-color: var(--chroma-secondary-c)
  position: fixed
  top: 12px
  left: 12px
  transition: all 300ms ease-in-out
  z-index: 100000
  .hamburger  
    position: relative
    height: 24px
    width: 24px
    .bar
      opacity: 0.8
      background-color: white
      height: 2px
      width: 24px
      border-radius: 1px
      position: absolute
      display: block
      transition: all 350ms
      transition-timing-function: cubic-bezier(1, 0.05, 0.62, 1.78)
      &:first-of-type
        top: 0px
      &:nth-of-type(2)
        top: 10px
      &:nth-of-type(3)
        top: 20px
  &.active
    left: calc(100vw - 92px)
    background-color: var(--chroma-secondary-a)
    .bar
      transition: all 280ms
      transition-timing-function: cubic-bezier(1, 0.05, 0.62, 1.78)
      &:first-of-type
        top: 10px
        transform: rotate(45deg)
      &:nth-of-type(2)
        opacity: 0
        transform: translateX(-15px)
      &:nth-of-type(3)
        top: 10px
        transform: rotate(-45deg)
</style>