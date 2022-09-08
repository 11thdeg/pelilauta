import { getAnalytics, logEvent as logAnalyticsEvent } from '@firebase/analytics'

export function logEvent (source: string, info?:{ [key: string]:unknown }):void {
  // eslint-disable-next-line
  console.info('🐠', source, info)
  logAnalyticsEvent(getAnalytics(), source, info)
}

export function logDebug (...args: unknown[]):void {
  // eslint-disable-next-line
  console.debug('🪲', ...args)
}

export function logError (...args: unknown[]):void {
  // eslint-disable-next-line
  console.error('🐙', ...args)
}