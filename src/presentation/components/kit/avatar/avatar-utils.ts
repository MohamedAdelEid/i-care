const AVATAR_HUES = [210, 225, 195, 170, 250, 280, 320, 25, 45, 160] as const

export const hashNameToIndex = (name: string): number => {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % AVATAR_HUES.length
}

export const avatarColorFromName = (name: string): string => {
  const hue = AVATAR_HUES[hashNameToIndex(name)]
  return `hsl(${hue} 45% 42%)`
}

export const initialsFromName = (name: string, max = 2): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  const first = parts[0]!
  if (parts.length === 1) return first.slice(0, max).toUpperCase()
  const second = parts[1]!
  return `${first[0] ?? ''}${second[0] ?? ''}`.toUpperCase()
}
