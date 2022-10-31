<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProfileButton from '../actions/ProfileButton.vue'
import InboxButton from '../actions/InboxButton.vue'
import TrayMenuButton from './TrayMenuButton.vue'
import { useUxState } from '../../composables/useUXState'

const props = defineProps<{
  title?: string,
  noun?: string,
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

</script>
<template>
  <nav
    id="AppBar"
    :class="{ withmenu: navTrayVisible }"
  >
    <TrayMenuButton />
    <cyan-toolbar>
      <cyan-icon
        v-if="!navTrayVisible"
        class="noun"
        :noun="noun"
      />
      <cyan-toolbar-heading v-if="title">
        {{ title }}
      </cyan-toolbar-heading>
      <cyan-spacer />
      <cyan-lightmode-toggle />
      <InboxButton />
      <ProfileButton />
    </cyan-toolbar>
  </nav>
</template>

<style scoped lang="sass">
#AppBar
  margin: 0 8px
@media screen and (max-width: 600px)
  #AppBar
    padding: 0
    &.withmenu
      padding-left: 56px
      .noun
        display: none
</style>