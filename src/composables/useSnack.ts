import { ref } from 'vue'
import { logDebug } from '../utils/logHelpers'
import { productionLogConfig } from '../config'

const snackStack = ref(new Array<{ message: string, params?: Record<string, string>, action?: CallableFunction }>())


function doLog () {
  return productionLogConfig.components.includes('snackbar')
} 
interface Config {
  params?: Record<string, string>
  action?: CallableFunction
}
/**
 * Adds a message to the snackbar stack.
 * 
 * @param message i18n key (if not found from locale files, it prints the key itself as a string)
 * @param config { params: Record<string, string>, action: CallableFunction }
 */
function pushSnack(message: string, config?:Config) {
  if (doLog()) logDebug('pushSnack', message)
  snackStack.value.push({ message, ...config })
}

export function useSnack() {
  return { pushSnack, snackStack }
}