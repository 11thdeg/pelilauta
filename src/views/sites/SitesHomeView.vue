<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import SiteList from '../../components/sites/SiteList.vue'
import MekanismiAd from '../../components/calltoaction/MekanismiAd.vue'
import { onMounted } from 'vue'
import { useTitle } from '@vueuse/core'
import WithLoader from '../../components/ui/WithLoader.vue'
import { useSites } from '../../composables/useSites'
import { useSession } from '../../composables/useSession'
import FabTray from '../../components/FabTray/FabTray.vue'

const { t } = useI18n()
const { loading } = useSites()
const { anonymous } = useSession()

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
    <main class="container">
      <WithLoader :suspended="loading">
        <SiteList />
      </WithLoader>
    </main>
  </div>
  <FabTray v-if="!anonymous">
    <router-link to="/add/site">
      <cyan-fab
        noun="add"
        :label="t('action.add.site')"
      />
    </router-link>
  </FabTray>
</template>