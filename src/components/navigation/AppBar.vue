<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProfileButton from '../actions/ProfileButton.vue'
import InboxButton from '../actions/InboxButton.vue'

import { useUxState } from '../../composables/useUXState'
import Banner from '../ui/Banner.vue'
import { logDebug } from '../../utils/logHelpers'
import TrayMenuButton from './TrayMenuButton.vue'

const props = defineProps<{
  title?: string,
  noun?: string,
  sticky?: boolean
}>()

const { t } = useI18n()

const title = computed(() => {
  if (props.title) return props.title
  return t('app.title')
})

const { navTrayVisible } = useUxState()

</script>
<template>
  <div>
    <cyan-top-app-bar
      :title="title"
      :sticky="props.sticky"
      :menu="navTrayVisible"
      @change="logDebug('AppBar', 'onchange', $event.detail)"
    >
      <TrayMenuButton class="onlyOnMobile" />
      <cyan-icon
        v-if="!navTrayVisible"
        class="noun onlyOnMobile"
        :noun="noun"
      />
      <h2 v-if="title">
        {{ title }}
      </h2>
      <cyan-spacer />
      <cyan-lightmode-toggle class="hideOnMobile" />
      <InboxButton />
      <ProfileButton />
    </cyan-top-app-bar>
    <Banner />
  </div>
</template>