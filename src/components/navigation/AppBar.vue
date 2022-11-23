<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ProfileButton from '../actions/ProfileButton.vue'
import InboxButton from '../actions/InboxButton.vue'
import TrayMenuButton from './TrayMenuButton.vue'
import { useUxState } from '../../composables/useUXState'
import Banner from '../ui/Banner.vue'

const props = defineProps<{
  title?: string,
  noun?: string,
  sticky?: boolean
}>()

const { t } = useI18n()
const { navTrayVisible } = useUxState()

const title = computed(() => {
  if (props.title) return props.title
  return t('app.title')
})

const noun = computed(() => {
  if (props.noun) return props.noun
  return 'fox'
})

const raised = ref(false)
onMounted(() => {
  if (props.sticky) {
    document.addEventListener('scroll', (e: Event) => {
      const top = window.pageYOffset || (e.target as HTMLElement).scrollTop || 0
      raised.value = top > 2
    })
  }
})

</script>
<template>
  <header :class="{ sticky: sticky, 'overlay': raised }">
    <nav
      id="AppBar"
    >
      <cyan-toolbar large>
        <TrayMenuButton class="onlyOnMobile" />
        <cyan-icon
          v-if="!navTrayVisible"
          class="noun onlyOnMobile"
          :noun="noun"
        />
        <cyan-toolbar-heading v-if="title">
          {{ title }}
        </cyan-toolbar-heading>
        <cyan-spacer />
        <cyan-lightmode-toggle class="hideOnMobile" />
        <InboxButton />
        <ProfileButton />
      </cyan-toolbar>
    </nav>
    <Banner />
  </header>
</template>

<style scoped lang="sass">
#AppBar
  margin: 0
  padding: 0 8px
  background-color: var(--cyan-background-color)
.sticky
  position: -webkit-sticky
  position: sticky
  top: 0px
  z-index: var(--pelilauta-z-index-navigation)
  transition: all 0.2s ease-in-out
  padding-right: 8px
  &.overlay
    transition: all 0.6s ease-in-out
    box-shadow: 0px 0px 55px -12px var(--chroma-secondary-d)
@media screen and (max-width: 600px)
  #AppBar
    padding: 0px 8px
    &.withmenu
      padding-left: 56px
      .noun
        display: none
</style>