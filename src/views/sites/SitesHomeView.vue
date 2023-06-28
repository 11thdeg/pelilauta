<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import SiteList from '../../components/sites/SiteList.vue'
import MekanismiAd from '../../components/calltoaction/MekanismiAd.vue'
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
    <cn-app-bar
      id="TopBar"
      noun="mekanismi"
      :title="$t('sites.title')"
    />
    <main class="bookLayout">
      <WithLoader :suspended="loading">
        <SiteList />
      </WithLoader>
      <article class="Column small">
        <MekanismiAd />
      </article>
    </main>
  </div>
</template>