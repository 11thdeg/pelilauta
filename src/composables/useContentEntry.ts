import { marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { computed } from 'vue'
import { logDebug } from '../utils/logHelpers'
import { toMekanismiURI } from '../utils/toMekanismiURI'
import { useSite } from './useSite'

/**
 * Exported from Skald 2.0
 *
 * @param siteid slug for the site
 * @param htmlContent the payload to be rendered on screen
 * @returns the htmlContent with [wiki:link] replaced with <a href="siteid/link">link</a>
 * etc. See Skaldmd in Skald 2.x for reference
 */
function renderWikiLinks (siteid:string, htmlContent:string): string {
  // eslint-disable-next-line
  const re = new RegExp('([\\[(]wiki:)(.+?)([\\])])', 'gmu')
  let siteslug = siteid
  const content = htmlContent.replace(re, (match, p1, p2) => {
    p2 = p2.trim()
    const link = p2.includes('|') ? p2.substring(p2.indexOf('|') + 1).trim() : p2
    let url = p2.split('|')[0]
    if (url.includes('/')) {
      siteslug = toMekanismiURI(url.split('/')[0].trim())
      url = url.split('/')[1]
    }
    url = toMekanismiURI(url.trim())
    return `<a href="/sites/${siteslug}/pages/${url}">${link}</a>`// '<a href' + p2 + '-'
  })
  return content
}

export function useContentEntry (
  entry: { htmlContent?: string, markdownContent?: string }, options?: { snippetLength?: number, default?: string, headingPrefix?: string }) {
  const { key } = useSite()
  const content = computed(() => {
    
    if (!entry.htmlContent && !entry.markdownContent) {
      logDebug('useContentEntry', 'No content found for entry', entry, options)
      return options?.default || ''
    }

    let c = ''
    // Newer entries have markdownContent, older ones have htmlContent
    if (entry.markdownContent) {

      const prefix = (options?.headingPrefix || '').trim() + '-heading-'

      marked.setOptions({
        gfm: true,
        smartypants: false,
        mangle: false
      })
      marked.use(gfmHeadingId({
        prefix
      }))

      c = marked(entry.markdownContent)
    }
    else c = entry.htmlContent || ''

    // Render wiki links
    c = renderWikiLinks(key.value, c)

    return c
  })
  return {
    content,
    snippet: computed(() => {
      const len = options?.snippetLength || 277
      const domNodes = new DOMParser().parseFromString(content.value, 'text/html').body.childNodes
      let snippet = ''
      for (let i = 0; i < domNodes.length; i++) {
        const node = domNodes[i]
        if (node.textContent) {
          let text = node.textContent
          if (snippet.length + text.length > len) {
            text = text.substring(0, len - snippet.length) + '...'
          }
          snippet += text + '\n\n'
        }
        if (snippet.length > len) {
          break
        }
      }
      return snippet
    })
  }
}
