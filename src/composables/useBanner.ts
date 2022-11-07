import { computed, ref, Ref } from 'vue'
import { logDebug } from '../utils/logHelpers'

const bannerText = ref('')
const show = ref(false)
const bannerAction:Ref<undefined|CallableFunction> = ref(undefined)

function raise(text:string, action?:CallableFunction) {
  logDebug('raise', text)
  bannerText.value = text
  bannerAction.value = action || undefined
  show.value = true
}

function onCancel () {
  bannerAction.value = undefined
  bannerText.value = ''
  show.value = false
}
function onConfirm () {
  if (bannerAction.value) bannerAction.value()
  onCancel()
}

export function useBanner() {
  return {
    raise,
    onCancel,
    onConfirm,
    show: computed(() => show.value),
    text: computed(() => bannerText.value),
    hasAction : computed(() => !!bannerAction.value)
  }
}