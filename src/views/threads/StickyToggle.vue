<script lang="ts" setup>
import { CyanToggle } from '@11thdeg/cyan'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { useThread } from '../../composables/useThread'
import { store } from '../../utils/firestoreHelpers'

const { thread } = useThread()
const { t } = useI18n()
const { admin } = useSession()

function toggleSticky(event: Event) {
  const sticky = (event.target as CyanToggle).checked
  if (!thread.value) return
  thread.value.sticky = sticky
  store(thread.value)
}

</script>

<template>
  <cyan-toggle
    v-if="admin && thread"
    :title="t('action.sticky')"
    :checked="thread.sticky"
    :label="t('action.sticky')"
    @change="toggleSticky"
  />
</template>