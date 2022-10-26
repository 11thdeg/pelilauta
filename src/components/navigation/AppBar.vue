<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProfileButton from '../actions/ProfileButton.vue'
import InboxButton from '../actions/InboxButton.vue'

const props = defineProps<{
  title?: string,
  subtitle?: string,
  subtitleLink?: string,
  noun?: string,
}>()

const { t } = useI18n()

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
  <nav id="AppBar">
    <cyan-icon
      :noun="noun"
    />

    <h1
      id="viewTitle"
      class="TypeHeadline5"
    >
      {{ title }}
    </h1>

    <cyan-spacer />
    <cyan-lightmode-toggle />
    <InboxButton />
    <ProfileButton />
  </nav>
</template>

<style scoped lang="sass">
#AppBar
  margin: 0
  padding: 0 8px
  display: flex
  justify-content: space-between
  align-items: center
  height: 56px
  gap: 12px
  #viewTitle
    padding-top: 10px
  h1:first-child
    line-height: 56px
  h2.TypeCaption
    margin-top: 8px
</style>