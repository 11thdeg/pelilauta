<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProfileButton from '../actions/ProfileButton.vue'

const props = defineProps<{
  title?: string,
  noun?: string,
}>()

const { t } = useI18n()

const title = computed(() => {
  if (props.title) return props.title
  return t('app.title')
})
</script>
<template>
  <nav id="AppBar">
    <cyan-icon
      v-if="props.noun"
      :noun="props.noun"
    />
    <h1 class="TypeHeadline5">
      {{ title }}
    </h1>
    <cyan-spacer />
    <cyan-lightmode-toggle class="inAppBar" />
    <ProfileButton />
  </nav>
</template>

<style scoped lang="sass">
#AppBar
  margin: 0
  paddin: 0
  display: flex
  justify-content: space-between
  align-items: top
  height: 56px
.inAppBar
  margin-top: 8px
</style>