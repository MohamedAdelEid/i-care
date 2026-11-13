/** Served from `public/sounds/notifications/new-notification.mp3` */
export const NOTIFICATION_SOUND_PATH = '/sounds/notifications/new-notification.mp3'

const DEFAULT_VOLUME = 0.55

let audio: HTMLAudioElement | null = null
let isUnlocked = false

const prefersReducedSound = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isSoundEnabled = (): boolean => true

const getAudio = (): HTMLAudioElement => {
  if (!audio) {
    audio = new Audio(NOTIFICATION_SOUND_PATH)
    audio.preload = 'auto'
    audio.volume = DEFAULT_VOLUME
  }

  return audio
}

/** Call after a user gesture so the browser allows playback later. */
export const unlockNotificationSound = (): void => {
  if (isUnlocked || typeof window === 'undefined') return

  isUnlocked = true
  const element = getAudio()
  element.load()

  const previousVolume = element.volume
  element.volume = 0

  void element
    .play()
    .then(() => {
      element.pause()
      element.currentTime = 0
      element.volume = previousVolume
    })
    .catch(() => {
      element.volume = previousVolume
    })
}

export const playNotificationSound = (): void => {
  if (typeof window === 'undefined') return
  if (!isSoundEnabled() || prefersReducedSound()) return

  const element = getAudio()
  element.currentTime = 0

  void element.play().catch(() => {
    // Browsers block audio until the user interacts with the page.
  })
}

export const setNotificationSoundVolume = (volume: number): void => {
  getAudio().volume = Math.min(1, Math.max(0, volume))
}
