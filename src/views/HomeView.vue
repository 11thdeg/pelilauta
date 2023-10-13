<script lang="ts" setup>
import CreateAccountAd from '../components/calltoaction/CreateAccountAd.vue'
import MekanismiAd from '../components/calltoaction/MekanismiAd.vue'
import { useI18n } from 'vue-i18n'
import FabTray from '../components/FabTray/FabTray.vue'
import { useSession } from '../composables/useSession'
import LokiCard from '../components/calltoaction/LokiCard/LokiCard.vue'
import { useTitle } from '../composables/useTitle'
import { onMounted } from 'vue'
import ThreadStreamColumn from '../components/ThreadStreamColumn/ThreadStreamColumn.vue'
import MyrrysCard from '../components/calltoaction/MyrrysCard/MyrrysCard.vue'
import TopSitesSection from '../components/frontpage/TopSitesSection.vue'
import ShareButton from '../components/ShareButton/ShareButton.vue'
import Banner from '../components/ui/Banner.vue'
import MobileFooter from '../components/MobileFooter/MobileFooter.vue'
import { useScreenSize } from '../composables/useScreenSize'

const { t } = useI18n()
const { anonymous } = useSession()
const { title } = useTitle()
const { isLarge } = useScreenSize()

onMounted(() => {
  title.value = '⚀'
})
</script>

<template>
  <!-- For the App front page, we use the app-bar defaults! -->
  <cn-app-bar :title="t('app.title')">
    <ShareButton />
  </cn-app-bar>

  <Banner />

  <main class="container">
    <ThreadStreamColumn />
    <div class="column Column small">
      <MyrrysCard />
      <hr class="separator">
      <LokiCard />
      <template v-if="!isLarge">
        <br>
        <MekanismiAd />
        <TopSitesSection />
      </template>
    </div>
    <div
      v-if="isLarge" 
      class="column Column small flex flex-column"
    >
      <CreateAccountAd />
      <MekanismiAd />
      <TopSitesSection />
    </div>
    <MobileFooter />
  </main>
  <FabTray v-if="!anonymous">
    <router-link to="/add/thread">
      <cyan-fab
        noun="add"
        :label="t('action.add.thread')"
      />
    </router-link>
  </FabTray>
</template>

<style lang="sass" scoped>
main
  padding-bottom: calc(var(--cn-page-grid) * 6)
.separator
  width: 100%
</style>