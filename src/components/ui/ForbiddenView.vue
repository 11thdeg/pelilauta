<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <cn-app-bar
    id="TopBar"
    modal
    :title="$t('error.forbidden')"
    @back="router.back()"
  />
  <main class="singleColumnLayout">
    <p>{{ t('error.forbidden.description') }}</p>
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        :label="t('action.back')"
        noun="arrow-left"
        @click="router.back()"
      />
      <cyan-spacer />
    </cyan-toolbar>
  </main>
</template>