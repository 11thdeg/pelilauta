import { marked } from 'marked'
import { computed } from 'vue'

export function useContentEntry (entry: { htmlContent?: string, markdownContent?: string }, options?: { snippetLength: number }) {
  const content = computed(() => {
    // Newer entries have markdownContent, older ones have htmlContent
    if (entry.markdownContent) {
      return marked(entry.markdownContent)
    }
    return entry.htmlContent || ''
  })
  return {
    content,
    snippet: computed(() => {
      const len = options?.snippetLength || 100
      const domNodes = new DOMParser().parseFromString(content.value, 'text/html').body.childNodes
      let snippet = ''
      for (let i = 0; i < domNodes.length; i++) {
        const node = domNodes[i]
        if (node.textContent) {
          snippet += '<p>' + node.textContent + '</p>'
        }
        if (snippet.length > len) {
          break
        }
      }
      return snippet
    })
  }
}
