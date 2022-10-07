<script lang="ts" setup>
import { computed } from 'vue'
import { usePage } from '../../composables/usePage'
import { useSite } from '../../composables/useSite'
import AppBar from '../ui/AppBar.vue'

const props =  defineProps<{
  sitekey: string
  pagekey?: string
}>()


const { site } = useSite(props.sitekey)
const { page } = usePage(props.pagekey || site.value?.homepage || props.sitekey)

const title = computed(() => {
  if (props.pagekey) return page.value?.name || '...'
  if (site.value?.name) return site.value.name
  return '...'
})

const subtitle = computed(() => {
  return site.value?.name || '...'
})

const subtitleLink = computed(() => {
  return `/sites/${props.sitekey}`
})

const noun = computed(() => {
  return site.value?.systemBadge || 'mekanismi'
})
</script>

<template>
  <AppBar
    :title="title"
    :subtitle="subtitle"
    :subtitle-link="subtitleLink"
    :noun="noun"
  />
</template>
