<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <cyan-top-app-bar
    id="TopBar"
    modal
    @back="router.back()"
  >
    <h3>{{ $t('error.forbidden') }}</h3>
  </cyan-top-app-bar>

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