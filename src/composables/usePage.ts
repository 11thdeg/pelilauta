import { Page } from "@11thdeg/skaldstore"
import { computed, ref } from "vue"
import { fetchPage } from "./usePages"
import { useSite } from "./useSite"


const loading = ref(false)
const page = ref<Page | undefined>(undefined)

async function loadPage(pagekey: string) {
  const { site } = useSite()
  if (page.value?.key === pagekey) return
  loading.value = true
  if (site.value?.key) {
    page.value = await fetchPage(site.value.key, pagekey)
  }
  loading.value = false
}

export function usePage(threadkey?: string) {
  if (threadkey) loadPage(threadkey)
  return {
    loading,
    page,
    notFound: computed(() => page.value === undefined && !loading.value)
  }
}