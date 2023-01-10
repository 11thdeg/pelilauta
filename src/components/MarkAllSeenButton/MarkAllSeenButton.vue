<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSubscriber } from '../../composables/useSession/useSubscriber'

const { t } = useI18n()
const { markAllSeen } = useSubscriber()


</script>

<template>
  <cyan-button
    text
    :label="t('action.markAllSeen')"
    @click="markAllSeen"
  />
</template>