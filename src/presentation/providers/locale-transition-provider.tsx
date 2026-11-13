import { motion } from 'framer-motion'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import type { Language } from '@/domain/enums'
import { useLanguageStore } from '@/presentation/store'

const FADE_OUT_S = 0.18
const FADE_IN_S = 0.32
const EASE = [0.4, 0, 0.2, 1] as const

type TransitionPhase = 'idle' | 'fade-out' | 'fade-in'

interface LocaleTransitionState {
  isTransitioning: boolean
  startLocaleTransition: (language: Language) => void
}

const LocaleTransitionContext = createContext<LocaleTransitionState | null>(null)

// Hook is intentionally colocated with the provider for a single import surface.
// eslint-disable-next-line react-refresh/only-export-components -- context hook
export const useLocaleTransition = (): LocaleTransitionState => {
  const context = useContext(LocaleTransitionContext)

  if (!context) {
    throw new Error('useLocaleTransition must be used within LocaleTransitionProvider')
  }

  return context
}

interface LocaleTransitionProviderProps {
  children: ReactNode
}

export const LocaleTransitionProvider = ({ children }: LocaleTransitionProviderProps) => {
  const setLanguage = useLanguageStore((state) => state.setLanguage)
  const [phase, setPhase] = useState<TransitionPhase>('idle')
  const pendingLanguageRef = useRef<Language | null>(null)

  const startLocaleTransition = useCallback(
    (language: Language) => {
      if (phase !== 'idle') return
      pendingLanguageRef.current = language
      setPhase('fade-out')
    },
    [phase],
  )

  const handleAnimationComplete = useCallback(() => {
    if (phase === 'fade-out') {
      if (pendingLanguageRef.current) {
        setLanguage(pendingLanguageRef.current)
        pendingLanguageRef.current = null
      }
      setPhase('fade-in')
      return
    }

    if (phase === 'fade-in') {
      setPhase('idle')
    }
  }, [phase, setLanguage])

  const isTransitioning = phase !== 'idle'

  useEffect(() => {
    if (!isTransitioning) return

    const html = document.documentElement
    const { body } = document
    const previousHtmlOverflow = html.style.overflow
    const previousBodyOverflow = body.style.overflow
    const previousHtmlPadding = html.style.paddingInlineEnd

    const scrollbarWidth = Math.max(0, window.innerWidth - html.clientWidth)

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      html.style.paddingInlineEnd = `${scrollbarWidth}px`
    }

    return () => {
      html.style.overflow = previousHtmlOverflow
      body.style.overflow = previousBodyOverflow
      html.style.paddingInlineEnd = previousHtmlPadding
    }
  }, [isTransitioning])

  return (
    <LocaleTransitionContext.Provider value={{ isTransitioning, startLocaleTransition }}>
      <motion.div
        initial={false}
        animate={{ opacity: phase === 'fade-out' ? 0 : 1 }}
        transition={{
          duration: phase === 'fade-out' ? FADE_OUT_S : FADE_IN_S,
          ease: EASE,
        }}
        onAnimationComplete={handleAnimationComplete}
        className="h-dvh max-h-dvh overflow-hidden"
        style={{ willChange: isTransitioning ? 'opacity' : 'auto' }}
      >
        {children}
      </motion.div>
    </LocaleTransitionContext.Provider>
  )
}
