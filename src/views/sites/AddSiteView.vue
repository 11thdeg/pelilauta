<script lang="ts" setup>
import AddSiteForm from '../../components/sites/AddSiteForm.vue'
import { useSession } from '../../composables/useSession'
import WithPermission from '../../components/ui/WithPermission.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { anonymous, active } = useSession()
</script>

<template>
  <div class="AddSiteView">
    <cn-app-bar
      id="TopBar"
      modal
      :title="$t('action.create')"
      @back="() => router.back()"
    />
    <main class="bookLayout">
      <WithLoader :suspended="!active">
        <WithPermission :forbidden="anonymous">
          <AddSiteForm />
        </WithPermission>
      </WithLoader>
    </main>
  </div>
</template>