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
    :label="t('action.toProfile')"
    text
  />
  <cyan-button
    v-if="active && anonymous"
    noun="login"
    :label="t('action.toLogin')"
    text
  />
</template>