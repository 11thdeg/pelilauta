import { computed, Ref, ref } from 'vue'

export function useFormField(value: string|number|Ref<string|number>) {
  const original = ref(value)
  const dirty:Ref<number|string|undefined> = ref()

  function reset() {
    dirty.value = ''
  }

  return {
    value: computed({
      get: () => dirty.value || original.value,
      set: (v:number|string) => {
        dirty.value = v
      }
    }),
    dirty: computed(() => !!dirty.value),
    reset
  }
}