import type { SileoOptions } from 'sileo'

/** Inverted from app theme so toasts stay visible on the page background. */
export const getSileoToasterOptions = (mode: 'light' | 'dark'): Partial<SileoOptions> => {
  if (mode === 'dark') {
    return {
      fill: '#F8F9FB',
      roundness: 14,
      styles: {
        title: 'text-sm! font-semibold! text-neutral-900! text-center!',
        description: 'text-sm! text-neutral-600! text-center!',
        badge: 'bg-[#1653AC]/10!',
        button: 'bg-[#1653AC]/10! hover:bg-[#1653AC]/15!',
      },
    }
  }

  return {
    fill: '#111A2C',
    roundness: 14,
    styles: {
      title: 'text-sm! font-semibold! text-white! text-center!',
      description: 'text-sm! text-white/75! text-center!',
      badge: 'bg-white/10!',
      button: 'bg-white/10! hover:bg-white/15!',
    },
  }
}
