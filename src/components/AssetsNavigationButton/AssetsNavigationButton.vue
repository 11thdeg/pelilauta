<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSession } from '../../composables/useSession'

const props = defineProps<{
 label?: string
}>()

const route = useRoute()
const { anonymous } = useSession()

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
      to="/assets"
    >
      <cyan-navigation-button
        :label="buttonLabel"
        noun="assets"
        :active="route.path.startsWith('/assets')"
      />
    </router-link>
  </transition>
</template>