import { AnimatePresence, motion } from 'framer-motion'
import { SidebarToggleIcon } from '@/presentation/assets/icons/SidebarToggle'
import { BrandMark } from '@/presentation/components/brand'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { cn } from '@/presentation/utils'
import { SIDEBAR_DURATION, SIDEBAR_EASE, textVariants } from './animations'

interface SidebarHeaderProps {
  isCollapsed: boolean
  onToggle: () => void
}

export const SidebarHeader = ({ isCollapsed, onToggle }: SidebarHeaderProps) => {
  const { t } = useTranslation('common')
  return (
    <div className="relative h-20 border-b border-dashed border-sidebar-border">
      <div
        className={cn(
          'flex h-full items-center',
          isCollapsed ? 'justify-center px-3 pb-1' : 'justify-between px-1',
        )}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          {isCollapsed ? (
            <BrandMark variant="icon" className="size-[30px]" />
          ) : (
            <AnimatePresence initial={false}>
              <motion.div
                key="sidebar-logo"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-72 shrink-0"
              >
                <BrandMark variant="lockup" className="pe-8" />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      <motion.button
        type="button"
        layout
        onClick={onToggle}
        aria-label={isCollapsed ? t('expandSidebar') : t('collapseSidebar')}
        transition={{ duration: SIDEBAR_DURATION, ease: SIDEBAR_EASE }}
        className={cn(
          'absolute flex items-center justify-center rounded-control text-muted-foreground motion-micro',
          'hover:text-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:outline-none',
          isCollapsed
            ? 'bottom-0 left-1/2 z-10 size-7 -translate-x-1/2 translate-y-1/2'
            : 'end-1 top-1/2 size-8 -translate-y-1/2',
        )}
      >
        <SidebarToggleIcon
          className={cn('transition-[width,height]', isCollapsed ? 'size-4' : 'size-5 sm:size-6')}
        />
      </motion.button>
    </div>
  )
}
