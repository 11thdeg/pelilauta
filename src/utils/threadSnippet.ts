import { Thread } from "@11thdeg/skaldstore"

export function threadSnippet(thread?: Thread) {
  if (!thread) return ''
  if (thread.markdownContent) return thread.markdownContent.slice(0, 240) + '...'
  const div = document.createElement('div')
  div.innerHTML = thread.htmlContent
  let snip = ''
  if (div.firstChild) {
    snip = div.firstChild.textContent || ''
    if (snip.length > 240) snip = snip.substring(0, 240) + '...'
  }
  if (snip.length < 239 && div.firstChild?.nextSibling) {
    snip += '<br><br>' + div.firstChild.nextSibling.textContent || ''
    if (snip.length > 240) snip = snip.substring(0, 240) + '...'
  } 
  return snip
}