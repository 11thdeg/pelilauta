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
    <div class="title">
      <h2
        v-if="subtitle"
        class="TypeCaption"
      >
        <router-link
          v-if="subtitleLink"
          :to="subtitleLink"
        >
          {{ subtitle }}
        </router-link>
        <template v-else>
          {{ subtitle }}
        </template>
      </h2>
      <h1 class="TypeHeadline5">
        {{ title }}
      </h1>
    </div>
    
    <cyan-spacer />
    <cyan-lightmode-toggle />
    <InboxButton />
    <ProfileButton />
  </nav>
</template>

<style scoped lang="sass">
#AppBar
  margin: 0
  padding: 0
  display: flex
  justify-content: space-between
  align-items: center
  height: 56px
  gap: 12px
.title
  height: 56px
  display: flex
  flex-direction: column
  justify-content: center
  h2, h1
    margin: 0
    a
      color: black
      text-decoration: none
  h2.TypeCaption
    margin-top: 8px
</style>