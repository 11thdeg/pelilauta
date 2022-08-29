<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'

const { t } = useI18n()
const { account } = useSession()
</script>

<template>
  <article class="Column dontBreakOut">
    <h2>{{ t('account.accountDataPane.title') }}</h2>
    <div class="debug">
      <pre>
        {{ account }}
      </pre>
    </div>
  </article>
</template>