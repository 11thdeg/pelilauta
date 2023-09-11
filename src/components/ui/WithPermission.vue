<script setup lang="ts">
import { toRefs } from 'vue'
import RestrictedContent from '../RestrictedContent/RestrictedContent.vue'

const props = defineProps<{
  forbidden: boolean
}>()

const { forbidden } = toRefs(props)
</script>

<template>
  <div
    v-if="forbidden"
    class="singleColumnLayout"
  >
    <div class="Column column">
      <RestrictedContent />
    </div>
  </div>
  <template v-else>
    <slot />
  </template>
</template>