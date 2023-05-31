/**
 * Post process content of an entry, to decorate it with interactivity
 */
export function postProcessContent(content: string | HTMLElement) {
  let rootNode: HTMLElement

  if (typeof content === 'string') {
    const div = document.createElement('div')
    div.innerHTML = content
    rootNode = div
  } else {
    if (content.tagName === 'DIV') {
      rootNode = content
    }
    else {
      rootNode = document.createElement('div')
      rootNode.appendChild(content)
    }
  }
  if (!rootNode) throw new Error('Could not create root node for post processing')

  // Add class to root node
  rootNode.classList.add('CyanContentNode')

  // We want to replace all hashtags inside text with links
  const textNodes = rootNode.querySelectorAll(':not(iframe):not(script):not(style):not(a):not(pre):not(code):not(blockquote):not(.CyanContentNode)')
  textNodes.forEach((node: Node) => {
    const element = node as HTMLElement
    const text = element.textContent || ''
    // Include all text starting with # and ending with a space, including umlauts, dashes and underscores
    const hashtags = text.match(/#[a-zA-Z0-9äöüÄÖÜß\-_]+/g)
    if (hashtags) {
      hashtags.forEach(hashtag => {
        const link = document.createElement('a')
        link.href = `/tag/${hashtag.slice(1)}`
        link.textContent = hashtag
        element.innerHTML = element.innerHTML.replace(hashtag, link.outerHTML)
      })
    }
  })

  return rootNode
}

