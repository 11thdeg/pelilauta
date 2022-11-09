import { useMediaQuery } from '@vueuse/core'

export function useScreenSize () {
  return {
    isSmall: useMediaQuery('(max-width: 600px)'),
    isMedium: useMediaQuery('(min-width: 600px) and (max-width: 1100px)'),
    isLarge: useMediaQuery('(min-width: 1100px)')
  }
}