<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import LoginPanel from '../components/account/SocialLoginForm.vue'
import EmailLoginForm from '../components/account/EmailLoginForm.vue'
import { computed, onMounted } from 'vue'
import { useTitle } from '../composables/useTitle'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const props = defineProps<{
  backroute?: string
}>()

const to = computed(() => {
  if (props.backroute) return props.backroute
  return '/'
})

onMounted(() => {
  useTitle().title.value = t('login.title')
})

function back() {
  if (props.backroute) router.push(props.backroute)
  else router.back()
}
</script>

<template>
  <cn-app-bar
    :title="$t('login.title')"
    :modal="backroute ? true : undefined"
    @back="back"
  />
  <main
    id="LoginView"
    class="container"
  >
    <EmailLoginForm :to="to" />
    <LoginPanel :to="to" />
  </main>
</template>

<style lang="sass">
#LoginView
  padding-top: var(--cn-page-grid)
</style>