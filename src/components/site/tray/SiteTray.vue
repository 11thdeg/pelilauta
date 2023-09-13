<script setup lang="ts">
import { useScreenSize } from '../../../composables/useScreenSize';
import PageIndex from '../../SiteTray/PageIndex.vue'
import SiteTrayHeader from './SiteTrayHeader.vue'
import { computed, ref } from 'vue'

const showTray = ref(false)
const { isSmall } = useScreenSize()

const trayVisible = computed(() => showTray.value || !isSmall.value)
</script>

<template>
  <article class="small column surface">
    <SiteTrayHeader @show="(visible) => showTray = visible"/>
    <PageIndex v-if="trayVisible" :class="{ 'rise-a': isSmall, 'p-1': isSmall }"/>
  </article>
</template>