<script lang="ts" setup>
import AppBar from '../components/navigation/AppBar.vue'
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

const { t } = useI18n()
const { anonymous } = useSession()
const { title } = useTitle()

onMounted(() => {
  title.value = '⚀'
})

</script>
<template>
  <AppBar />
  <main class="bookLayout">
    <ThreadStreamColumn />
    <div class="Column small flex flex-column">
      <MyrrysCard />
      <hr class="separator">
      <LokiCard />
    </div>
    <div class="Column small flex flex-column">
      <CreateAccountAd />
      <MekanismiAd />
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

<style lang="sass" scoped>
.separator
  width: 100%
</style>