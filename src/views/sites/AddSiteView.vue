<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/navigation/TopBar.vue'
import AddSiteForm from '../../components/sites/AddSiteForm.vue'
import { useSession } from '../../composables/useSession'
import LoginRequiredColumn from '../../components/account/LoginRequiredColumn.vue'

const { t } = useI18n()
const { anonymous } = useSession()
</script>

<template>
  <div class="AddSiteView">
    <TopBar :title="t('sites.add.title')" />
    <main class="singleColumnLayout">
      <AddSiteForm v-if="!anonymous" />
      <LoginRequiredColumn
        v-else
        origin="/add/site"
      />
    </main>
  </div>
</template>