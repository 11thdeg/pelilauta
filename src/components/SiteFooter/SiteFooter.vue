<script lang="ts" setup>
import { useSite } from '../../composables/useSite'
import SiteThreadListColumn from '../SiteThreadList/SiteThreadListColumn.vue'
import WithLoader from '../ui/WithLoader.vue'
import SiteAdminsSection from './SiteAdminsSection.vue'
import SiteLicenseSection from './SiteLicenseSection.vue'

const { loading, key } = useSite()
</script>

<template>
  <footer class="SiteFooter">
    <WithLoader :suspended="loading">
      <hr>
      <div class="footerBlocks">
        <SiteLicenseSection />
        <SiteAdminsSection />
        <SiteThreadListColumn :sitekey="key" />
      </div>
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
.footerBlocks
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  gap: var(--cyan-gap-column)

@media screen and (max-width: 768px)
  .footerBlocks
    display: flex
    flex-direction: column
.SiteFooter
  margin-top: 48px
  padding: 24px
</style>
