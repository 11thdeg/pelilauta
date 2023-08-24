<script lang="ts" setup>
import { computed, toRefs, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { useSubscriber } from '../../composables/useSubscriber'
import { logDebug } from '../../utils/logHelpers'

const props = defineProps<{
  thread: {
    key?: string
    flowTime: number
  }
}>()

const { thread } = toRefs(props)
    

const { t } = useI18n()
const { anonymous } = useSession()
const { isNew, setSeen, setUnSeen, loading } = useSubscriber()

const seen = computed(() => {
  if (anonymous.value) return false
  if (!thread.value) return false
  if (!thread.value.key) return false
  return !isNew(thread.value.key, thread.value.flowTime)
})

const subsciberExists = computed(() => {
  if (anonymous.value) return false
  if (loading.value) return false
  return true
})

// If a user logs in, or has logged in, we need to update
// the backend to reflect the state of seen threads
watch(subsciberExists, (exists) => {
  logDebug('SeenButton', 'subsciberExists', exists)

  // No need to update if the user is anonymous
  if (!exists) return

  // No need to update if the thread is not loaded
  if (!thread.value.key) return

  if (isNew(thread.value.key , thread.value.flowTime)) {
    // The user has not seen the threads latest updates yet, lets changge that!
    setSeen(thread.value.key, thread.value.flowTime)
  }
}, { immediate: true})

function toggleUnseen () {
  if (anonymous.value) return
  if (!thread.value) return
  if (!thread.value.key) return
  setUnSeen(thread.value.key)
}

</script>

<template>
  <button
    v-if="!anonymous"
    class="SeenButton text"
    @click.prevent="toggleUnseen"
  >
    <cyan-icon
      small
      :noun="!seen ? 'eye' : 'eye-closed'"
    />
    {{ seen ? t('action.mark.unseen') : '' }}
  </button>
</template>