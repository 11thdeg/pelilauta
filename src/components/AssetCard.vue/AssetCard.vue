<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  to: string;
  url: string;
  name: string;
  description: string;
}>()

const title = computed(() => (props.name ? props.name : '...').substring(0, 22))
</script>

<template>
  <cyan-card
    :cover="url"
    elevation="1"
  >
    <h4
      slot="title"
      class="downscaled"
    >
      <router-link :to="to">
        {{ title }}
      </router-link>
    </h4>
    <cyan-icon
      slot="avatar"
      noun="assets"
    />
    <div class="assetData">
      <p class="downscaled TypeBody2">
        {{ name }}
      </p>
      <p class="downscaled TypeCaption">
        {{ description }}
      </p>
    </div>
  </cyan-card>
</template>

<style lang="sass" scoped>
.assetData
  margin-top: 24px
</style>