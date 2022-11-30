import { Page } from '@11thdeg/skaldstore'
import { computed, ref } from 'vue'
import { logError } from '../utils/logHelpers'
import { fetchPage } from './usePages'
import { useSession } from './useSession'
import { useSite } from './useSite'

const key = ref('')
const parentKey = ref('')
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
  parentKey.value = sk
  page.value = await fetchPage(sk, pagekey)

  if (!page.value) notFound.value = true
  loading.value = false
}

const canEdit = computed (() => {
  if (!page.value) return false
  if (loading.value) return false
  const { admin, uid } = useSession()
  if(admin.value) return true
  if(page.value.hasOwner(uid.value)) return true
  const { site } = useSite(parentKey.value)
  if (!site.value) {
    logError('No site found for page', page.value)
    return false
  }
  if (site.value.hasOwner(uid.value)) return true
  return false
})

export function usePage(pagekey?: string, sitekey?: string) {
  if (pagekey) loadPage(pagekey, sitekey)
  return {
    key: computed(() => key.value),
    loading: computed(() => loading.value),
    page: computed(() => page.value || new Page()),
    notFound: computed(() => notFound.value),
    canEdit
  }
}