
<script setup lang="ts">
const props = defineProps<{
  title: string,
  sticky: boolean
}>()
</script>

<template>
  <nav
    id="TopBar"
    :class="{ sticky: sticky }"
  >
    <cyan-icon
      noun="back"
      class="clickable hoverable inAppBar"
      @click="$router.back()"
    />
    <h1
      v-if="props.title"
      class="TypeHeadline5"
    >
      {{ props.title }}
    </h1>
    <cyan-spacer />
    <slot />
  </nav>
</template>

<style lang="sass" scoped>
#TopBar
  margin: 0
  paddin: 0
  display: flex
  justify-content: space-between
  align-items: top
  height: 56px
  gap: 12px
.inAppBar
  margin-top: 8px
</style>