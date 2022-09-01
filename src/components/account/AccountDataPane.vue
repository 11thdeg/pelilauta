<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'

const { t } = useI18n()
const { account, active, profile} = useSession()

</script>
    
<template>
  <article
    v-if="active"
    class="AccountSettingsPane Column dontBreakOut"
  >
    <section>
      <h4>App Metadata</h4>
      <p>This data is managed by the App, and stored to your private profile visible only to you and the administrative users</p>
      <div class="dataGrid">
        <p class="headCell">
          LightMode
        </p>
        <p>
          {{ account.lightMode }}
        </p>
        <p class="headCell">
          Last login
        </p>
        <p />
        <p class="headCell">
          UI Locale
        </p>
        <p>
          {{ account.locale }}
        </p>
      </div>
    </section>
    <section>
      <h4>{{ t('profile.title') }}</h4>
      <div class="titledList">
        <h4>{{ t('profile.fields.nickname') }}</h4>
        <p>{{ profile.nick }}</p>
        <h4>{{ t('profile.fields.avatarurl') }}</h4>
        <p>
          <a
            :href="profile.avatarURL"
            target="_new"
          >{{ profile.avatarURL }}</a>
        </p>
      </div>
    </section>
  </article>
</template>
