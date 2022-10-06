import { Thread } from "@11thdeg/skaldstore"
import { computed, ref } from "vue"
import { fetchThread } from "./useThreads"

const loading = ref(false)
const thread = ref<Thread | undefined>(undefined)

async function loadThread(threadkey: string) {
  if (thread.value?.key === threadkey) return
  loading.value = true
  thread.value = await fetchThread(threadkey)
  loading.value = false
}

export function useThread(threadKey: string) {
  loadThread(threadKey)
  return {
    loading,
    thread,
    notFound: computed(() => thread.value === undefined && !loading.value)
  }
}