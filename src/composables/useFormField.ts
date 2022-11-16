import { computed, Ref, ref } from 'vue'
import { logDebug } from '../utils/logHelpers'

export function useFormField(v: string|number|string[]|Ref<string|number|string[]>) {
  const original = ref(v)
  const dirty:Ref<number|string|string[]|undefined> = ref()

  function reset() {
    dirty.value = undefined
  }

  return {
    computed: computed({
      get: () => dirty.value === undefined ? original.value : dirty.value,
      set: (val:number|string|string[]) => {
        logDebug('useFormField', 'set', val)
        dirty.value = val
      }
    }),
    dirty: computed(() => dirty.value !== undefined),
    reset
  }
}