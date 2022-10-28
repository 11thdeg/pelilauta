<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import LoginPanel from '../components/account/SocialLoginForm.vue'
import TopBar from '../components/navigation/TopBar.vue'
import EmailLoginForm from '../components/account/EmailLoginForm.vue'
import { computed } from 'vue'

const { t } = useI18n()
const props = defineProps<{
  backroute?: string
}>()

const to = computed(() => {
  if (props.backroute) return props.backroute
  return '/'
})
</script>

<template>
  <TopBar :title="t('login.title')" />
  <main class="bookLayout">
    <LoginPanel :to="to" />
    <EmailLoginForm :to="to" />
  </main>
</template>