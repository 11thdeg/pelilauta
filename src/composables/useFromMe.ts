import { computed, ref, Ref } from 'vue'
import { useSession } from './useSession'

export interface EntryWithAuhtors {
  owners: string[]
}

export function useFromMe(entry: EntryWithAuhtors|Ref<EntryWithAuhtors>) {
  const _entry = ref(entry)
  return {
    fromMe: computed(() => {
      const { uid } = useSession()
      if (!uid.value) return false
      return _entry.value.owners.includes(uid.value)
    })
  }
}