<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const { active, anonymous, profile } = useSession()
const router = useRouter()
</script>

<template>
  <cyan-button
    v-if="active && !anonymous"
    class="hideOnMobile"
    noun="avatar"
    :label="profile.nick"
    text
    @click="router.push('/settings')"
  />
  <cyan-button
    v-if="active && anonymous"
    noun="avatar"
    class="hideOnMobile"
    :label="t('action.toLogin')"
    text
    @click="router.push('/login')"
  />
</template>