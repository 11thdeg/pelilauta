<script lang="ts" setup>
import { useSite } from '../../composables/useSite'

const { site } = useSite()
</script>
<template>
  <h4 class="downscaled underscore">
    <cyan-icon
      small
      :noun="site.systemBadge"
      style="display: inline-block"
      class="m-0"
    /> {{ site.name }}
  </h4>
</template>