export function moveUp (arr: unknown[], index: number) {
  // Sanity: there might be nothing to move
  if (index >= arr.length - 1) return
  if (index < 1) return
  // Swap the items in place
  const temp = arr[index - 1]
  arr[index - 1] = arr[index]
  arr[index] = temp
  return arr
}