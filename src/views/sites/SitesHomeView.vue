<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import AppBar from '../../components/navigation/AppBar.vue'
import SiteList from '../../components/sites/SiteList.vue'
import MekanismiAd from '../../components/cta/MekanismiAd.vue'
import { onMounted } from 'vue'
import { useTitle } from '@vueuse/core'
import WithLoader from '../../components/ui/WithLoader.vue'
import { useSites } from '../../composables/useSites'

const { t } = useI18n()
const { loading } = useSites()

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
      <WithLoader :suspended="loading">
        <SiteList />
      </WithLoader>
      <article class="Column">
        <MekanismiAd />
      </article>
    </main>
  </div>
</template>