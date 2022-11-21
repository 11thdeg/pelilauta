import { Page } from '@11thdeg/skaldstore'
import { computed, ref } from 'vue'
import { fetchPage } from './usePages'
import { useSite } from './useSite'

const key = ref('')
const loading = ref(false)
const page = ref<Page | undefined>(undefined)
const notFound = ref(false)

export async function loadPage(pagekey: string, sitekey?: string) {
  if (page.value?.key === pagekey) return
  loading.value = true
  notFound.value = false
  key.value = pagekey

  const sk = sitekey || useSite().key.value
  if (!sk) throw new Error('No site key provided')
  page.value = await fetchPage(sk, pagekey)

  if (!page.value) notFound.value = true
  loading.value = false
}

export function usePage() {
  return {
    key: computed(() => key.value),
    loading: computed(() => loading.value),
    page: computed(() => page.value || new Page()),
    notFound: computed(() => notFound.value)
  }
}