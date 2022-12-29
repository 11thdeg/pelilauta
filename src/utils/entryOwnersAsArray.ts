type Entry = {
  owners: string | string[]
}

export function entryOwnersAsArray(entry: Entry): string[] {
  const owners = entry.owners
  if (typeof owners === 'string') {
    return [owners]
  }
  return owners
}