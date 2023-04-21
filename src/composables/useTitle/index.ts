import { useTitle as coreUseTitle } from '@vueuse/core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNotifications } from '../useSession/useNotifications'

export function useTitle() {
  const title = coreUseTitle()
  return {
    title: computed({
      get: () => title.value as string,
      set: (value: string) => {
        const { t } = useI18n()
        const { newCount, hasNew } = useNotifications()
        const newCountString = hasNew.value ? `(${newCount.value}) ` : ''
        const pageTitle = value ? `/ ${value}` : ''
        title.value = `${t('app.title')} ${newCountString} ${pageTitle}`
      }
    })
  }
}