export const truncateWords = (value: string, maxWords: number) => {
  const words = value.trim().split(/\s+/)
  if (words.length <= maxWords) return value
  return `${words.slice(0, maxWords).join(' ')}…`
}

export const exceedsWordLimit = (value: string, maxWords: number) =>
  value.trim().split(/\s+/).length > maxWords
