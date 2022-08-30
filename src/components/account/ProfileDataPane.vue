<script lang="ts" setup>
    import { useI18n } from 'vue-i18n'
    import { useSession } from '../../composables/useSession'
    
    const { t } = useI18n()
    const { profile, active } = useSession()
    </script>
    
<template>
  <article class="ProfileDataPane Column dontBreakOut">
    <cyan-loader v-if="!active" />
    <template v-else>
      <h2>{{ t('account.profileDataPane.title') }}</h2>
      <div class="debug code">
        {{ profile }}
      </div>
    </template>
  </article>
</template>