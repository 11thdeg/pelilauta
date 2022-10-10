<script lang="ts" setup>
import { computed } from 'vue'
import { useNotifications } from '../../composables/useNotifications'

const { notifications } = useNotifications()
const count = computed(() => notifications.value.length)
</script>

<template>
  <div class="InboxButton">
    <cyan-button
      noun="send"
      text
      @click="$router.push('/inbox')"
    />
    <cyan-tag
      highlight
      class="InboxButton__count"
      :label="count"
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