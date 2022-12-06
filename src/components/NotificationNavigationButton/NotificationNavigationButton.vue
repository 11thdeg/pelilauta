<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSession } from '../../composables/useSession'
import { useNotifications } from '../../composables/useSession/useNotifications'

const route = useRoute()
const { anonymous } = useSession()

const { newCount } = useNotifications()

const notification = computed(() => {
  const count = parseInt(newCount.value)
  if (count > 9) {
    return '9+'
  }
  return count > 0 ? newCount.value : undefined
})
</script>

<template>
  <router-link
    to="/inbox"
  >
    <cyan-navigation-button
      :disabled="anonymous"
      noun="send"
      :active="route.path === '/inbox'"
      :notification="notification"
    />
  </router-link>
</template>