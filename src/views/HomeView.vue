<script lang="ts" setup>
import AppBar from '../components/navigation/AppBar.vue'
import ThreadCardList from '../components/threads/ThreadCardList.vue'
import CreateAccountAd from '../components/cta/CreateAccountAd.vue'
import MekanismiAd from '../components/cta/MekanismiAd.vue'
import { useI18n } from 'vue-i18n'
import FabTray from '../components/ui/FabTray.vue'
import { useSession } from '../composables/useSession'

const { t } = useI18n()
const { anonymous } = useSession()

</script>
<template>
  <AppBar />
  <main class="bookLayout">
    <ThreadCardList />
    <div class="Column">
      <CreateAccountAd />
      <MekanismiAd />
    </div>
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