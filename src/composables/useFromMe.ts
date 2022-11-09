import { computed, ref, Ref } from 'vue'
import { useSession } from './useSession'

export interface EntryWithAuhtors {
  owners: string|string[]
}

export function useFromMe(entry: EntryWithAuhtors|Ref<EntryWithAuhtors>) {
  const _entry = ref(entry)
  return {
    fromMe: computed(() => {
      const { uid } = useSession()
      if (!uid.value) return false
      if (Array.isArray(_entry.value.owners)) {
        return _entry.value.owners.includes(uid.value)
      }
      return _entry.value.owners === uid.value
    })
  }
}