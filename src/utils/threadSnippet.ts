// import { Reply, Thread } from "@11thdeg/skaldstore"

export function threadSnippet(thread?: {markdownContent?: string, htmlContent?: string }, length=240) {
  if (!thread) return ''
  if (thread.markdownContent) return thread.markdownContent.slice(0, length) + '...'
  const div = document.createElement('div')
  div.innerHTML = thread.htmlContent || ''
  let snip = ''
  if (div.firstChild) {
    snip = div.firstChild.textContent || ''
    if (snip.length > length) snip = snip.substring(0, length) + '...'
  }
  if (snip.length < length && div.firstChild?.nextSibling) {
    snip += '<br><br>' + div.firstChild.nextSibling.textContent || ''
    if (snip.length > length) snip = snip.substring(0, length) + '...'
  } 
  return snip
}