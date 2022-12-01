<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  large?: boolean;
  site: {
    avatarURL: string,
    systemBadge: string
  }
}>()

const noun = computed(() => props.site.systemBadge || 'mekanismi')
const largeIcon = computed(() => !!props.large || undefined)
</script>

<template>
  <div class="SiteAvatar">
    <img
      v-if="site.avatarURL"
      class="avatar rise-b"
      :src="site.avatarURL"
      :alt="noun"
    >
    <cyan-icon
      v-else
      dark
      :large="largeIcon"
      class="avatar"
      :noun="noun"
    />
  </div>
</template>

<style lang="sass" scoped>
.SiteAvatar
  img.avatar
    height: 100%
    width: 100%
    height: 72px
    width: 72px
    border-radius: 50%
    object-fit: cover
    background-color: var(--cyan-base-color)
  .avatar
    border-radius: 50%
</style>
