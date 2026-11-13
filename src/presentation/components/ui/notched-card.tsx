import type { CSSProperties, HTMLAttributes } from 'react'
import { cn } from '@/presentation/utils/cn'

interface NotchedCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Parent surface behind the card — must match for the notch illusion */
  surfaceColor?: string
}

const NOTCH_TRANSITION: CSSProperties = {
  transition:
    'box-shadow 500ms cubic-bezier(0.4, 0, 0.2, 1), background-color 500ms cubic-bezier(0.4, 0, 0.2, 1)',
}

/**
 * Concave corner via rounded bar + shadow circles — same technique as qdeaz HeroImages NotchEffect.
 */
function CardNotch({ surfaceColor }: { surfaceColor: string }) {
  return (
    <div
      style={{ ...NOTCH_TRANSITION, backgroundColor: surfaceColor }}
      className="pointer-events-none absolute top-0 z-10 h-[70px] w-[100px] ltr:right-0 rtl:left-0 ltr:rounded-bl-[20px] rtl:rounded-br-[20px]"
      aria-hidden="true"
    >
      <div
        style={NOTCH_TRANSITION}
        className="absolute top-0 size-11 rounded-full ltr:left-[-44px] rtl:right-[-44px] ltr:shadow-[20px_-22px_0_0_var(--notch-surface)] rtl:shadow-[-20px_-22px_0_0_var(--notch-surface)]"
      />
      <div
        style={NOTCH_TRANSITION}
        className="absolute bottom-[-44px] size-11 rounded-full ltr:right-0 rtl:left-0 ltr:shadow-[20px_-22px_0_0_var(--notch-surface)] rtl:shadow-[-20px_-22px_0_0_var(--notch-surface)]"
      />
    </div>
  )
}

export function NotchedCard({
  className,
  children,
  surfaceColor = '#0b0c0f',
  style,
  ...props
}: NotchedCardProps) {
  return (
    <div
      className={cn('relative', className)}
      style={{ '--notch-surface': surfaceColor, ...style } as CSSProperties}
      {...props}
    >
      <CardNotch surfaceColor={surfaceColor} />
      <div className="overflow-hidden rounded-2xl bg-zinc-800">{children}</div>
    </div>
  )
}
