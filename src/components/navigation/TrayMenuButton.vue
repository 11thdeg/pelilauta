<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
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

const route = useRoute()

const noun = computed(() => {
  if (route.path.startsWith('/sites')) return 'mekanismi'
  return 'fox'
})

</script>

<template>
  <cyan-nav-menu-button
    v-if="navTrayVisible"
    id="TrayMenuButton"
    :open="active"
    :class="{ active: active }"
    :noun="noun"
    @change="onActiveStateChange($event.detail)"
  />
</template>

<style lang="sass" scoped>
#TrayMenuButton
  z-index: 10000000
  position: relative
  box-shadow: none
  transition: all 0.3s ease-in-out
  &[open]
    position: fixed
    transform: translateX(73vw)
    
</style>