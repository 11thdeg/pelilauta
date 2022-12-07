<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSession } from '../../composables/useSession'
import { useNotifications } from '../../composables/useSession/useNotifications'

const props = defineProps<{
 label?: string
}>()

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

const buttonLabel = computed(() => props.label || undefined)

</script>

<template>
  <transition
    mode="out-in"
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__zoomOut"
    :duration="330"
  >
    <router-link
      v-if="!anonymous"
      to="/inbox"
    >
      <cyan-navigation-button
        :label="buttonLabel"
        noun="send"
        :active="route.path === '/inbox'"
        :notification="notification"
      />
    </router-link>
  </transition>
</template>