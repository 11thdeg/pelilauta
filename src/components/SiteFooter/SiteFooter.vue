<script lang="ts" setup>
import { useSite } from '../../composables/useSite'
import WithLoader from '../ui/WithLoader.vue'
import SiteLicenseSection from './SiteLicenseSection.vue'

const { loading } = useSite()
</script>

<template>
  <footer class="SiteFooter">
    <WithLoader :suspended="loading">
      <hr>
      <SiteLicenseSection />
      <hr>
      <div class="flex">
        <cyan-spacer />
        <cyan-icon
          noun="mekanismi"
          xlarge
          style="opacity: 0.11;"
        />
        <cyan-spacer />
      </div>
    </WithLoader>
  </footer>
</template>

<style lang="sass" scoped>
.SiteFooter
  margin-top: 48px
  padding: 24px
</style>
