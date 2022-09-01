<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'

const { t } = useI18n()
const { active, anonymous } = useSession()
</script>

<template>
  <cyan-button
    v-if="active && !anonymous"
    noun="avatar"
    :label="t('action.toSettings')"
    text
    @click="$router.push('/settings')"
  />
  <cyan-button
    v-if="active && anonymous"
    noun="avatar"
    :label="t('action.toLogin')"
    text
    @click="$router.push('/login')"
  />
</template>