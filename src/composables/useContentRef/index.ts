import { ContentEntryType } from '@11thdeg/skaldstore/dist/ContentEntry'
import { marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { Ref, computed } from 'vue'
import { postProcessContent } from '../../utils/content/postProcessContent'

function parseContent(entry: ContentEntryType) {
  // No content, return an empty string
  if (!entry.htmlContent && !entry.markdownContent) {
    return ''
  }
  // Markdown content found - parse it to HTML
  if (entry.markdownContent) {
    const prefix = entry.key + '-heading-'

    marked.setOptions({
      gfm: true,
      smartypants: false,
      mangle: false
    })
    marked.use(gfmHeadingId({
      prefix
    }))

    return marked(entry.markdownContent)
  }
  // HTML content found - return it
  else return entry.htmlContent || ''
}

/**
 * Take in a vue ref with "content entry"
 * 
 * and parses the fields to HTML snippets and such.
 * 
 * @param {Ref<ContentEntryType>} entryRef a Vue3 ref with a ContentEntryType object
 */
export function useContentRef(
  entry: Ref<ContentEntryType>,
) {
  return {
    entry,
    content: computed(() => postProcessContent(parseContent(entry.value)).outerHTML)
  } 
}