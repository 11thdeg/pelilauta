<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import AppBar from '../../components/navigation/AppBar.vue'
import SiteList from '../../components/sites/SiteList.vue'
import MekanismiAd from '../../components/cta/MekanismiAd.vue'
import { onMounted } from 'vue'
import { useTitle } from '@vueuse/core'

const { t } = useI18n()

onMounted(() => {
  useTitle().value = t('app.title') + ' / ' + t('sites.title')
})

</script>
<template>
  <div class="SitesHomeView">
    <AppBar
      :title="t('sites.title')"
      noun="mekanismi"
    />
    <main class="bookLayout">
      <SiteList />
      <article class="Column">
        <MekanismiAd />
      </article>
    </main>
  </div>
</template>