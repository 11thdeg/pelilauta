import { computed, Ref, ref } from 'vue'
import { logDebug } from '../utils/logHelpers'

export function useFormField(v: string|number|Ref<string|number>) {
  const original = ref(v)
  const dirty:Ref<number|string|undefined> = ref()

  function reset() {
    dirty.value = ''
  }

  return {
    computed: computed({
      get: () => dirty.value === undefined ? original.value : dirty.value,
      set: (val:number|string) => {
        logDebug('useFormField', 'set', val)
        dirty.value = val
      }
    }),
    dirty: computed(() => dirty.value !== undefined),
    reset
  }
}