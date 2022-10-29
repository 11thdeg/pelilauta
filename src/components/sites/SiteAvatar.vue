<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  site: {
    avatarURL: string,
    systemBadge: string
  }
}>()

const noun = computed(() => props.site.systemBadge || 'mekanismi')
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
      large
      class="avatar rise-c"
      :noun="noun"
    />
  </div>
</template>

<style lang="sass" scoped>
.SiteAvatar
  height: 72px
  width: 72px
  border-radius: 50%
  background-color: var(--cyan-base-color)
  img.avatar
    height: 100%
    width: 100%
    object-fit: cover
  .avatar
    border-radius: 50%
</style>
