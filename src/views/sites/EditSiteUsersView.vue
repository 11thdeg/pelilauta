<script lang="ts" setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LoginRequiredColumn from '../../components/account/LoginRequiredColumn.vue'
import SiteFooter from '../../components/SiteFooter/SiteFooter.vue'
import OwnerEditor from '../../components/sites/tools/OwnerEditor.vue'
import PlayerEditor from '../../components/sites/tools/PlayerEditor.vue'

import { useSite } from '../../composables/useSite'
import { useTitle } from '../../composables/useTitle'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const { title } = useTitle()
const router = useRouter()

const { site, loading, canEdit } = useSite()

onMounted(() => {
  title.value = t('site.tools.users')
})
</script>

<template>
  <div id="EditSiteUsersView">
    <WithLoader :suspended="loading">
      <cn-app-bar 
        noun="adventurer"
        :title="$t('site.tools.users')"
        modal
        @back="router.push('/sites/' + site.key)"
      />
      <main class="dashboardLayout">
        <LoginRequiredColumn v-if="!canEdit" />
        <template v-else>
          <OwnerEditor />
          <PlayerEditor />
        </template>
      </main>
      <SiteFooter />
    </WithLoader>
  </div>
</template>