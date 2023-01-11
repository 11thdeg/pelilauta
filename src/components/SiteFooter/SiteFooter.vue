<script lang="ts" setup>
import { useSite } from '../../composables/useSite'
import WithLoader from '../ui/WithLoader.vue'
import SiteLicenseSection from './SiteLicenseSection.vue'

const { loading } = useSite()
</script>

<template>
  <footer class="SiteFooter">
    <WithLoader :suspended="loading">
      <SiteLicenseSection />
    </WithLoader>
  </footer>
</template>

<style lang="sass" scoped>
.SiteFooter
  margin-top: 48px
</style>
