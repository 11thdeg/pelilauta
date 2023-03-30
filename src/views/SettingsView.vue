<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import SsoDataSection from '../components/settings/SsoDataSection.vue'
import AccountDataSection from '../components/settings/AccountDataSection.vue'
import AppSettingsColumn from '../components/settings/AppSettingsColumn.vue'
import ProfileDataColumn from '../components/settings/ProfileDataColumn.vue'
import { onMounted } from 'vue'
import { useTitle } from '@vueuse/core'
import { useSession } from '../composables/useSession'
import WithPermission from '../components/ui/WithPermission.vue'
import WithLoader from '../components/ui/WithLoader.vue'

const { t } = useI18n()
const { active, anonymous } = useSession()

onMounted(() => {
  useTitle().value = t('app.title') + ' / ' + t('settings.title')
})
</script>

<template>
  <cyan-top-app-bar
    sticky
    modal
    @back="$router.back()"
  >
    <h3>{{ $t('settings.title') }}</h3>
  </cyan-top-app-bar>
  <main
    :class="
      { 
        dashboardLayout: !anonymous,
        singleColumnLayout: anonymous
      }"
  >
    <WithLoader :suspended="!active">
      <WithPermission :forbidden="anonymous">
        <ProfileDataColumn />
        <AppSettingsColumn />
        <article class="Column">
          <h2>{{ t('settings.accountDataPane.title') }}</h2>
          <AccountDataSection />
          <SsoDataSection />
        </article>
      </withpermission>
    </WithLoader>
  </main>
</template>