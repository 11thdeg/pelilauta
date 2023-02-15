<script lang="ts" setup>
import { computed } from 'vue'
import { usePage } from '../../composables/usePage'
import { useSite } from '../../composables/useSite'
import AppBar from '../navigation/AppBar.vue'
import LoveASiteButton from '../SiteCard/LoveASiteButton.vue';

const props =  defineProps<{
  sitekey: string
  pagekey?: string
}>()


const { site } = useSite(props.sitekey)
const { page } = usePage()

const title = computed(() => {
  if (props.pagekey) return page.value?.name || '...'
  if (site.value?.name) return site.value.name
  return '...'
})

const noun = computed(() => {
  return site.value?.systemBadge || 'mekanismi'
})
</script>

<template>
  <AppBar
    :title="title"
    :noun="noun"
  >
    <LoveASiteButton v-if="site" :site="site" />
  </AppBar>
</template>
