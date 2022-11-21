import { Thread } from '@11thdeg/skaldstore'
import { computed, ref } from 'vue'
import { useSession } from './useSession'
import { fetchThread } from './useThreads'

const loading = ref(false)
const thread = ref<Thread | undefined>(undefined)

async function loadThread(threadkey: string) {
  if (thread.value?.key === threadkey) return
  loading.value = true
  thread.value = await fetchThread(threadkey)
  loading.value = false
}

const canEdit = computed (() => {
  if (!thread.value) return false
  if (loading.value) return false
  const { admin, uid } = useSession()
  if(admin.value) return true
  if(thread.value.hasOwner(uid.value)) return true
  return false
})

export function useThread(threadkey?: string) {
  if (threadkey) loadThread(threadkey)
  return {
    loading,
    canEdit,
    thread,
    notFound: computed(() => thread.value === undefined && !loading.value)
  }
}