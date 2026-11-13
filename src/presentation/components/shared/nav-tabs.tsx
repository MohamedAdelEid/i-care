import { NavLink } from 'react-router-dom'
import { cn } from '@/presentation/utils'

export interface NavTabItem {
  to: string
  label: string
}

interface NavTabsProps {
  items: NavTabItem[]
}

export const NavTabs = ({ items }: NavTabsProps) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          cn(
            'rounded-full border px-3 py-1.5 text-sm transition-colors',
            isActive
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border text-muted-foreground hover:text-foreground',
          )
        }
      >
        {item.label}
      </NavLink>
    ))}
  </div>
)
