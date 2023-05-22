
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  title: string
}>()

const barTitle = computed(() => {
  if (props.title) return props.title
  return '...'
})

</script>

<template>
  <cyan-top-app-bar
    id="TopBar"
    modal
    back
    @back="router.back()"
  >
    <h2>
      {{ barTitle }}
    </h2>
    <cyan-spacer />
    <slot />
  </cyan-top-app-bar>
</template>