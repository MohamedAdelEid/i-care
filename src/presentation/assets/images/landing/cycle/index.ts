import cycle01Pickup from './cycle-01-pickup.webp'
import cycle02Wash from './cycle-02-wash.webp'
import cycle03Dispatch from './cycle-03-dispatch.webp'

/** Hero cycle stills — 3:4 WebP. Replace files in place; keep these names. */
export const landingCycleImages = {
  pickup: cycle01Pickup,
  wash: cycle02Wash,
  dispatch: cycle03Dispatch,
} as const

export const landingCycleSteps = [
  { id: 'pickup', src: cycle01Pickup },
  { id: 'wash', src: cycle02Wash },
  { id: 'dispatch', src: cycle03Dispatch },
] as const
