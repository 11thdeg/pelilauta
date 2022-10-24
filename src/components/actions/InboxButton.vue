<script lang="ts" setup>
import { useNotifications } from '../../composables/useNotifications'

const { newCount } = useNotifications()
</script>

<template>
  <div class="InboxButton">
    <cyan-button
      noun="send"
      text
      @click="$router.push('/inbox')"
    />
    <cyan-tag
      :notification="parseInt(newCount) > 0"
      secondary
      class="InboxButton__count"
      :label="newCount"
    />
  </div>
</template>

<style scoped lang="sass">
.InboxButton
  position: relative
  display: block
  .InboxButton__count
    pointer-events: none
    position: absolute
    bottom: -4px
    right: -4px
</style>