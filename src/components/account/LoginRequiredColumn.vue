<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSession } from '../../composables/useSession'
import ProfileButton from '../actions/ProfileButton.vue'

const props = defineProps<{
  origin?: string
}>()

const redirect = computed(() => props.origin || '/')

const { t } = useI18n()
const { anonymous } = useSession()
const router = useRouter()

onMounted(() => {
  if (!anonymous) {
    router.push(redirect.value)
  }
})

</script>
<template>
  <div class="Column LoginRequiredColumn">
    <h1>{{ t('app.loginrequired.title') }}</h1>
    <div class="iconFrame chroma-box-c">
      <cyan-icon
        noun="avatar"
        xlarge
        dark
      />
    </div>
    <p class="TypeBody">
      {{ t('app.loginrequired.message') }}
    </p>
    <ProfileButton />
  </div>
</template>

<style lang="sass" scoped>
.LoginRequiredColumn
  text-align: center
.iconFrame
  height: 128px
  width: 128px
  border-radius: 50%
  opacity: 0.5
  padding: 16px
  margin: 0 auto
</style>