<script lang="ts" setup>
import SiteChangesListColumn from '../SiteChangesListColumn/SiteChangesListColumn.vue'
import SiteThreadListColumn from '../SiteThreadList/SiteThreadListColumn.vue'
import SiteAdminsSection from './SiteAdminsSection.vue'
import SiteInfoSection from './SiteInfoSection.vue'
import SiteLicenseSection from './SiteLicenseSection.vue'
</script>

<template>
  <footer class="SiteFooter surface container">
    <article class="Column column">
      <SiteInfoSection />
      <SiteLicenseSection />
      <SiteAdminsSection />
      <SiteChangesListColumn />
    </article>
    <SiteThreadListColumn />
  </footer>

  <div
    class="flex justify-center"
    aria-hidden="true"
  >
    <cyan-icon
      noun="mekanismi"
      xlarge
      style="opacity: 0.11;"
    />
  </div>
</template>

<style lang="sass" scoped>
.footerBlocks
  display: grid
  grid-template-columns: repeat(1fr)
.SiteFooter
  margin-top: 24px
  padding: 24px
  border-radius: 16px
</style>
