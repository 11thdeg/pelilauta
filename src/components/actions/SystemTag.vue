<script lang="ts" setup>
import { computed } from 'vue'
import { useMeta } from '../../composables/useMeta'


const props = defineProps<{
  systemFamily: string;
}>()

const { siteThemes } = useMeta()

const noun = computed(() => {
  return siteThemes.value.find(t => t.id === props.systemFamily)?.icon || 'pelilauta'
})

const label = computed(() => {
  return siteThemes.value.find(t => t.id === props.systemFamily)?.id || '-'
})

</script>

<template>
  <cyan-tag
    :noun="noun"
    :label="label"
  />
</template>