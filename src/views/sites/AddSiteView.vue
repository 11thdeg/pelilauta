<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import AddSiteForm from '../../components/sites/AddSiteForm.vue'
import { useSession } from '../../composables/useSession'
import WithPermission from '../../components/ui/WithPermission.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const { anonymous, active } = useSession()
</script>

<template>
  <div class="AddSiteView">
    <cyan-top-app-bar
      id="TopBar"
      modal
      @back="() => router.back()"
    >
      <h3>{{ t('action.create') }}</h3>
    </cyan-top-app-bar>
    <main class="bookLayout">
      <WithLoader :suspended="!active">
        <WithPermission :forbidden="anonymous">
          <AddSiteForm />
        </WithPermission>
      </WithLoader>
    </main>
  </div>
</template>