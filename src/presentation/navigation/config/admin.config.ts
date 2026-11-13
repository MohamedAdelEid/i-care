import {
  BarChart3,
  Bot,
  Building2,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  Inbox,
  LayoutDashboard,
  MessageCircle,
  Radio,
  Settings,
  Stethoscope,
  TriangleAlert,
  Users,
  Workflow,
  Wrench,
  BookOpen,
  PlayCircle,
} from 'lucide-react'
import { ROUTES } from '@/presentation/routes/routes.constants'
import type { NavigationGroup } from '../types'

export const adminNavigationConfig: NavigationGroup[] = [
  {
    titleKey: 'overview',
    items: [
      {
        titleKey: 'overview',
        href: ROUTES.OVERVIEW,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    titleKey: 'inbox',
    items: [
      {
        titleKey: 'inbox',
        icon: Inbox,
        badgeCount: 12,
        children: [
          { titleKey: 'inboxAll', href: ROUTES.INBOX.ALL, icon: Inbox },
          { titleKey: 'inboxAi', href: ROUTES.INBOX.AI, icon: Bot },
          { titleKey: 'inboxWaiting', href: ROUTES.INBOX.WAITING, icon: TriangleAlert },
          { titleKey: 'inboxHuman', href: ROUTES.INBOX.HUMAN, icon: MessageCircle },
          { titleKey: 'inboxResolved', href: ROUTES.INBOX.RESOLVED, icon: MessageCircle },
        ],
      },
    ],
  },
  {
    titleKey: 'handoffs',
    items: [
      {
        titleKey: 'handoffs',
        icon: TriangleAlert,
        children: [
          { titleKey: 'handoffsAll', href: ROUTES.HANDOFFS.ALL, icon: TriangleAlert },
          { titleKey: 'handoffsCallCenter', href: ROUTES.HANDOFFS.CALL_CENTER, icon: Users },
          { titleKey: 'handoffsResults', href: ROUTES.HANDOFFS.RESULTS, icon: ClipboardList },
          { titleKey: 'handoffsContracts', href: ROUTES.HANDOFFS.CONTRACTS, icon: BookOpen },
        ],
      },
    ],
  },
  {
    titleKey: 'bookings',
    items: [
      {
        titleKey: 'bookings',
        icon: CalendarDays,
        children: [
          { titleKey: 'bookingsAll', href: ROUTES.BOOKINGS.LIST, icon: ClipboardList },
          { titleKey: 'bookingsCalendar', href: ROUTES.BOOKINGS.CALENDAR, icon: CalendarDays },
        ],
      },
    ],
  },
  {
    titleKey: 'clinicSetup',
    items: [
      {
        titleKey: 'clinicSetup',
        icon: Building2,
        children: [
          { titleKey: 'clinicDoctors', href: ROUTES.CLINIC.DOCTORS, icon: Stethoscope },
          { titleKey: 'clinicServices', href: ROUTES.CLINIC.SERVICES, icon: ClipboardList },
          { titleKey: 'clinicDepartments', href: ROUTES.CLINIC.DEPARTMENTS, icon: Users },
          { titleKey: 'clinicSchedule', href: ROUTES.CLINIC.SCHEDULE, icon: CalendarClock },
        ],
      },
    ],
  },
  {
    titleKey: 'customers',
    items: [{ titleKey: 'customers', href: ROUTES.CUSTOMERS.LIST, icon: Users }],
  },
  {
    titleKey: 'agents',
    items: [
      {
        titleKey: 'agents',
        icon: Bot,
        children: [
          { titleKey: 'agentsList', href: ROUTES.AGENTS.LIST, icon: Bot },
          { titleKey: 'knowledgeBase', href: ROUTES.AGENTS.KNOWLEDGE, icon: BookOpen },
          { titleKey: 'workflows', href: ROUTES.AGENTS.WORKFLOWS, icon: Workflow },
          { titleKey: 'tools', href: ROUTES.AGENTS.TOOLS, icon: Wrench },
          { titleKey: 'playground', href: ROUTES.AGENTS.PLAYGROUND, icon: PlayCircle },
        ],
      },
    ],
  },
  {
    titleKey: 'channels',
    items: [
      {
        titleKey: 'channels',
        icon: Radio,
        children: [
          { titleKey: 'whatsapp', href: ROUTES.CHANNELS.WHATSAPP, icon: MessageCircle },
          { titleKey: 'telegram', href: ROUTES.CHANNELS.TELEGRAM, icon: Radio },
        ],
      },
    ],
  },
  {
    titleKey: 'analytics',
    items: [
      {
        titleKey: 'analytics',
        icon: BarChart3,
        children: [
          { titleKey: 'analyticsPerformance', href: ROUTES.ANALYTICS.PERFORMANCE, icon: BarChart3 },
          { titleKey: 'analyticsInsights', href: ROUTES.ANALYTICS.INSIGHTS, icon: BarChart3 },
          { titleKey: 'analyticsUnanswered', href: ROUTES.ANALYTICS.UNANSWERED, icon: BarChart3 },
          { titleKey: 'analyticsCsat', href: ROUTES.ANALYTICS.CSAT, icon: BarChart3 },
        ],
      },
    ],
  },
  {
    titleKey: 'settings',
    items: [
      {
        titleKey: 'settings',
        icon: Settings,
        children: [
          { titleKey: 'settingsGeneral', href: ROUTES.SETTINGS.GENERAL, icon: Settings },
          { titleKey: 'settingsTeam', href: ROUTES.SETTINGS.TEAM, icon: Users },
          { titleKey: 'settingsRoles', href: ROUTES.SETTINGS.ROLES, icon: Users },
          { titleKey: 'settingsHours', href: ROUTES.SETTINGS.HOURS, icon: Settings },
          { titleKey: 'settingsNotifications', href: ROUTES.SETTINGS.NOTIFICATIONS, icon: Settings },
          { titleKey: 'settingsApi', href: ROUTES.SETTINGS.API, icon: Settings },
        ],
      },
    ],
  },
]
