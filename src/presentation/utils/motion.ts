export const MOTION_FAST_S = 0.15
export const MOTION_BASE_S = 0.2
export const MOTION_SLOW_S = 0.25

export const PAGE_EASE = [0, 0, 0.2, 1] as const

export const SPRING_OVERLAY = { type: 'spring' as const, stiffness: 380, damping: 32 }

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const fadeUp = (delay = 0) => {
  if (prefersReducedMotion()) {
    return {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    }
  }

  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: MOTION_SLOW_S, ease: PAGE_EASE, delay },
  }
}

export const microTransition = {
  duration: MOTION_BASE_S,
  ease: PAGE_EASE,
}
