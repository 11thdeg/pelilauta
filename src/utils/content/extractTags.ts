// Extract all hashtags from a markdown string
export function extractTags(input: string): string[] {
  // match all text starting with # and ending with a space, including umlauts, dashes and underscores
  const hashtags = input.match(/#[a-zA-Z0-9äöüÄÖÜß\-_]+/g)
  if (!hashtags) return []
  return hashtags.map(hashtag => hashtag.slice(1))
}