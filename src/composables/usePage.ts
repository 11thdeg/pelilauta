import { Page } from "@11thdeg/skaldstore"
import { computed, ref } from "vue"
import { fetchPage } from "./usePages"
import { useSite } from "./useSite"


const loading = ref(false)
const page = ref<Page | undefined>(undefined)

async function loadPage(pagekey: string, sitekey?: string) {
  if (page.value?.key === pagekey) return
  loading.value = true

  const sk = sitekey || useSite().key.value
  if (!sk) throw new Error("No site key provided")
  page.value = await fetchPage(sk, pagekey)

  loading.value = false
}

export function usePage(key?: string, sitekey?: string) {
  // providing a site key loads the site
  if (sitekey) useSite(sitekey)
  // providing a page key loads the page
  if (key && sitekey) loadPage(key, sitekey)
  return {
    loading: computed(() => loading.value),
    page: computed(() => page.value || new Page()),
    notFound: computed(() => page.value === undefined && !loading.value)
  }
}