<script lang="ts" setup>
import AppBar from '../components/navigation/AppBar.vue'
import ThreadCardList from '../components/ThreadCardList/ThreadCardList.vue'
import CreateAccountAd from '../components/cta/CreateAccountAd.vue'
import MekanismiAd from '../components/cta/MekanismiAd.vue'
import { useI18n } from 'vue-i18n'
import FabTray from '../components/ui/FabTray.vue'
import { useSession } from '../composables/useSession'
import LokiCard from '../components/cta/LokiCard/LokiCard.vue'
import { useTitle } from '@vueuse/core'
import { onMounted } from 'vue'

const { t } = useI18n()
const { anonymous } = useSession()
const title = useTitle()

onMounted(() => {
  title.value = t('app.title')
})

</script>
<template>
  <AppBar />
  <main class="bookLayout">
    <ThreadCardList />
    <div class="Column medium flex flex-column">
      <CreateAccountAd />
      <MekanismiAd />
      <LokiCard />
    </div>
    <!--article
      class="Column small hideOnMobile"
      style="display: none;"
    >
      <cyan-card
        style="overflow: hidden;"
        class="chroma-box-b"
        elevation="1"
      >
        <cyan-icon
          slot="avatar"
          noun="d20"
        />
        <h4 slot="title">
          Roolipelit -disco
        </h4>
        <br>
        <iframe
          style="border-radius: 12px; margin: -12px"
          src="https://discord.com/widget?id=226080512148635648&theme=dark"
          width="272"
          height="670"
          allowtransparency="true"
          frameborder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
      </cyan-card>
    </article-->
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