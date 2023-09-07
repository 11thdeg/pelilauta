/**
 * Replaces a String with a skald uri compatible slug
 * @param {string} s a String to be converted
 */
export function toMekanismiURI (s: string): string {
  if (s === null) return ''
  // eslint-disable-next-line
  const re = new RegExp('[^a-öA-Ö0-9]', 'gmu')
  let r = s.replace(re, '-')
  while (r.includes('--')) {
    r = r.split('--').join('-')
  }
  // if the string ends with a -, remove it
  if (r.endsWith('-')) {
    r = r.slice(0, -1)
  }
  
  return r
}