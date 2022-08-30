<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'

const { t } = useI18n()
const { account, active } = useSession()
</script>

<template>
  <article class="Column dontBreakOut">
    <cyan-loader v-if="!active" />
    <template v-else>
      <h2>{{ t('account.accountDataPane.title') }}</h2>
      <div class="code dontBreakOut">
        {{ account }}
      </div>
    </template>
  </article>
</template>