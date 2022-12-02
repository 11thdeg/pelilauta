import { computed, Ref, ref } from 'vue'
import { logDebug } from '../utils/logHelpers'

export function useStringField(v: string|Ref<string>){
  const originalValue = ref(v)
  const dirtyValue = ref('')

  function reset(nv?: string|Ref<string>) {
    if (nv) {
      originalValue.value = typeof nv === 'string' ? nv : nv.value
    }
    dirtyValue.value = ''
  }
  return {
    computed: computed({
      get() {
        return dirtyValue.value || originalValue.value
      },
      set(val:string) {
        dirtyValue.value = val
      }
    }),
    reset,
    dirty: computed(() => dirtyValue.value !== ''),
  }
}

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