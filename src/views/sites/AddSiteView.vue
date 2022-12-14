<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/navigation/TopBar.vue'
import AddSiteForm from '../../components/sites/AddSiteForm.vue'
import { useSession } from '../../composables/useSession'
import WithPermission from '../../components/ui/WithPermission.vue'
import WithLoader from '../../components/ui/WithLoader.vue'

const { t } = useI18n()
const { anonymous, active } = useSession()
</script>

<template>
  <div class="AddSiteView">
    <TopBar :title="t('action.create')" />
    <main class="bookLayout">
      <WithLoader :suspended="!active">
        <WithPermission :forbidden="anonymous">
          <AddSiteForm />
        </WithPermission>
      </WithLoader>
    </main>
  </div>
</template>