<script setup lang="ts">
import NavigationRail from './components/navigation/NavigationRail.vue'
import SnackBar from './components/ui/SnackBar.vue'
import { useUxState } from './composables/useUXState'
import EulaDialog from './components/account/EulaDialog.vue'
import NavigationBar from './components/navigation/NavigationBar.vue'
import { useSession, setMode } from './composables/useSession'
import { onMounted } from 'vue'

const { navTrayVisible } = useUxState()
const { anonymous } = useSession()

onMounted(() => {
  if (!anonymous.value) {
    document.addEventListener('cyan-mode-dark', () => {
      setMode('dark')
    })
    document.addEventListener('cyan-mode-light', () => {
      setMode('light')
    })
  }
})
</script>

<template>
  <NavigationRail />
  <div
    id="appContainer"
    :class="{ navTrayVisible: navTrayVisible }"
  >
    <router-view />
  </div>
  <EulaDialog />
  <SnackBar />
  <NavigationBar />
</template>

<style lang="sass" scoped>
@media screen and (min-width: 600px)
  div#appContainer
    margin: 0
    padding: 0
    margin-left: 80px
    position: relative
    &.navTrayVisible
      margin-left: 324px
</style>

