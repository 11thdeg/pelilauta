<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import NavButton from '../navigation/NavButton.vue'

const { t } = useI18n()
const { anonymous, profile } = useSession()

const noun = computed(() => {
  return anonymous.value ? 'logout' : 'avatar'
})
const route = computed(() => {
  return anonymous.value ? '/login' : '/settings'
})
const label = computed(() => {
  return anonymous.value ? t('action.login') : profile.value.nick
})
</script>
<template>
  <NavButton
    :noun="noun"
    :to="route"
    :label="label"
  />
</template>