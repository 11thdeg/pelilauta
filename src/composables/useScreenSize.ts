import { useMediaQuery } from '@vueuse/core'

export function useScreenSize () {
  return {
    isSmall: useMediaQuery('(max-width: 960px)'),
    isMedium: useMediaQuery('(min-width: 961px) and (max-width: 1120px)'),
    isLarge: useMediaQuery('(min-width: 1121px)')
  }
}