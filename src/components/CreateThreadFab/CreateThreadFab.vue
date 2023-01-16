<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useScreenSize } from '../../composables/useScreenSize'
import { useSession } from '../../composables/useSession'

const { anonymous, frozen } = useSession()
const canCreateThread = computed(() => !anonymous.value && !frozen.value)

const route = useRoute()
const router = useRouter()
function createThread() {
  const stream = route.params.streamkey
  if (stream) {
    router.push(`/streams/${stream}/add/thread`)
  }
  else {
    router.push('/add/thread')
  }
}

const { t } = useI18n()
const { isSmall } = useScreenSize()
const label = computed(() => {
  if (isSmall.value) {
    return undefined
  }
  return t('action.add.thread')
})

</script>

<template>
  <cyan-fab
    v-if="canCreateThread"
    noun="add"
    :label="label"
    @click="createThread"
  />
</template>