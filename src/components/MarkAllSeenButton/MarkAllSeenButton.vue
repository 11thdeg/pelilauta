<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { useSubscriber } from '../../composables/useSubscriber'

const { t } = useI18n()
const { markAllSeen } = useSubscriber()
const { anonymous } = useSession()


</script>

<template>
  <cyan-button
    v-if="!anonymous"
    text
    :label="t('action.markAllSeen')"
    @click="markAllSeen"
  />
</template>