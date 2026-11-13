import { useCallback, useEffect, useRef, useState } from 'react'
import { decodeAudioData, getAudioContext } from '@/infrastructure/libs/audio/sound-engine'
import type {
  SoundAsset,
  UseSoundOptions,
  UseSoundReturn,
} from '@/infrastructure/libs/audio/sound-types'

export function useSound(sound: SoundAsset, options: UseSoundOptions = {}): UseSoundReturn {
  const {
    volume = 1,
    playbackRate = 1,
    interrupt = false,
    soundEnabled = true,
    onPlay,
    onEnd,
    onPause,
    onStop,
  } = options

  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState<number | null>(sound.duration ?? null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const bufferRef = useRef<AudioBuffer | null>(null)

  useEffect(() => {
    let cancelled = false
    decodeAudioData(sound.dataUri)
      .then((buffer) => {
        if (!cancelled) {
          bufferRef.current = buffer
          setDuration(buffer.duration)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [sound.dataUri])

  const stop = useCallback(() => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop()
      } catch {
        // Already stopped
      }
      sourceRef.current = null
    }
    setIsPlaying(false)
    onStop?.()
  }, [onStop])

  const play = useCallback(
    (overrides?: { volume?: number; playbackRate?: number }) => {
      if (!soundEnabled) return

      const ctx = getAudioContext()
      if (ctx.state === 'suspended') void ctx.resume()

      const start = (buffer: AudioBuffer) => {
        if (interrupt && sourceRef.current) {
          stop()
        }

        const source = ctx.createBufferSource()
        const gain = ctx.createGain()

        source.buffer = buffer
        source.playbackRate.value = overrides?.playbackRate ?? playbackRate
        gain.gain.value = overrides?.volume ?? volume

        source.connect(gain)
        gain.connect(ctx.destination)

        source.onended = () => {
          if (sourceRef.current === source) sourceRef.current = null
          setIsPlaying(false)
          onEnd?.()
        }

        source.start(0)
        sourceRef.current = source
        gainRef.current = gain
        setIsPlaying(true)
        onPlay?.()
      }

      const buffer = bufferRef.current
      if (buffer) {
        start(buffer)
        return
      }

      void decodeAudioData(sound.dataUri)
        .then((decoded) => {
          bufferRef.current = decoded
          start(decoded)
        })
        .catch(() => {})
    },
    [sound.dataUri, soundEnabled, playbackRate, volume, interrupt, stop, onPlay, onEnd],
  )

  const pause = useCallback(() => {
    stop()
    onPause?.()
  }, [stop, onPause])

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume
    }
  }, [volume])

  return [play, { stop, pause, isPlaying, duration, sound }] as const
}
