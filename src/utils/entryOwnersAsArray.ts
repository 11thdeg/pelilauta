import { Entry } from '@11thdeg/skaldstore'

export function entryOwnersAsArray(entry: Entry): string[] {
  const owners = entry.owners
  if (typeof owners === 'string') {
    return [owners]
  }
  return owners
}