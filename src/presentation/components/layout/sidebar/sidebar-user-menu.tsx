import { useState } from 'react'
import { ChevronsUpDown, LogOut, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthActions } from '@/application/hooks'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/presentation/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/presentation/components/ui/tooltip'
import { useDirection } from '@/presentation/hooks/use-direction'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { useAuthStore } from '@/presentation/store'
import { cn } from '@/presentation/utils'

interface SidebarUserMenuProps {
  isCollapsed: boolean
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export const SidebarUserMenu = ({ isCollapsed }: SidebarUserMenuProps) => {
  const { t } = useTranslation('auth')
  const { t: tCommon } = useTranslation('common')
  const { isRtl } = useDirection()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const { logout } = useAuthActions()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const displayName = user?.name ?? tCommon('appName')
  const displayEmail = user?.email ?? ''

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await logout()
    } finally {
      navigate(ROUTES.LOGIN)
      setIsLoggingOut(false)
    }
  }

  const handleAccount = () => {
    navigate(ROUTES.SETTINGS.GENERAL)
  }

  const triggerButton = (
    <button
      type="button"
      className={cn(
        'flex w-full items-center gap-3 rounded-xl border border-sidebar-border/70 bg-sidebar-primary/40 p-2 dark:bg-sidebar-primary/0',
        'transition-colors duration-200 hover:bg-sidebar-accent',
        'focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:outline-none',
        isCollapsed && 'justify-center border-transparent bg-transparent px-2',
      )}
    >
      <div className="relative shrink-0">
        <Avatar size="sm">
          <AvatarImage src={user?.avatarUrl ?? undefined} alt={displayName} />
          <AvatarFallback className="bg-sidebar-accent text-[10px] text-sidebar-foreground">
            {getInitials(displayName)}
          </AvatarFallback>
        </Avatar>
      </div>
      {!isCollapsed ? (
        <>
          <div className="min-w-0 flex-1 text-start">
            <p className="truncate text-sm font-medium text-sidebar-foreground">{displayName}</p>
            <p className="truncate text-xs text-sidebar-foreground/60">{displayEmail}</p>
          </div>
          <ChevronsUpDown className="size-4 shrink-0 text-sidebar-foreground/50" />
        </>
      ) : null}
    </button>
  )

  const menuTrigger = <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>

  return (
    <DropdownMenu>
      {isCollapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>{menuTrigger}</TooltipTrigger>
          <TooltipContent side={isRtl ? 'left' : 'right'} sideOffset={8}>
            {displayName}
          </TooltipContent>
        </Tooltip>
      ) : (
        menuTrigger
      )}
      <DropdownMenuContent side={isRtl ? 'left' : 'right'} align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium">{displayName}</p>
          <p className="text-xs text-muted-foreground">{displayEmail}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleAccount}>
          <UserRound className="size-4" />
          {t('accountSettings')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
          <LogOut className="size-4" />
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
