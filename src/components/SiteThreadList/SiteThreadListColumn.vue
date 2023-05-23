<script lang="ts" setup>
import SiteThreadListSection from './SiteThreadListSection.vue'

const props = defineProps<{
  sitekey: string
}>()
</script>

<template>
  <article
    class="Column"
  >
    <SiteThreadListSection
      :sitekey="props.sitekey"
    />
  </article>
</template>
