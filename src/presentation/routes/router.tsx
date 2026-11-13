import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/presentation/layouts/dashboard-layout'
import { RootLayout } from '@/presentation/layouts/root-layout'
import { ProtectedRoute } from '@/presentation/routes/guards/protected-route'
import { PublicRoute } from '@/presentation/routes/guards/public-route'
import { ROUTES } from '@/presentation/routes/routes.constants'

const LoginPage = lazy(() =>
  import('@/presentation/pages/auth/login').then((m) => ({ default: m.LoginPage })),
)
const NotFoundPage = lazy(() =>
  import('@/presentation/pages/not-found-page').then((m) => ({ default: m.NotFoundPage })),
)
const OverviewPage = lazy(() =>
  import('@/presentation/pages/overview').then((m) => ({ default: m.OverviewPage })),
)
const InboxAllPage = lazy(() =>
  import('@/presentation/pages/inbox/all').then((m) => ({ default: m.InboxPage })),
)
const InboxAiPage = lazy(() =>
  import('@/presentation/pages/inbox/ai').then((m) => ({ default: m.InboxPage })),
)
const InboxWaitingPage = lazy(() =>
  import('@/presentation/pages/inbox/waiting').then((m) => ({ default: m.InboxPage })),
)
const InboxHumanPage = lazy(() =>
  import('@/presentation/pages/inbox/human').then((m) => ({ default: m.InboxPage })),
)
const InboxResolvedPage = lazy(() =>
  import('@/presentation/pages/inbox/resolved').then((m) => ({ default: m.InboxPage })),
)
const InboxThreadPage = lazy(() =>
  import('@/presentation/pages/inbox/thread').then((m) => ({ default: m.InboxThreadPage })),
)
const HandoffsAllPage = lazy(() =>
  import('@/presentation/pages/handoffs').then((m) => ({ default: m.HandoffsPage })),
)
const HandoffsCallCenterPage = lazy(() =>
  import('@/presentation/pages/handoffs/call-center').then((m) => ({ default: m.HandoffsPage })),
)
const HandoffsResultsPage = lazy(() =>
  import('@/presentation/pages/handoffs/results').then((m) => ({ default: m.HandoffsPage })),
)
const HandoffsContractsPage = lazy(() =>
  import('@/presentation/pages/handoffs/contracts').then((m) => ({ default: m.HandoffsPage })),
)
const BookingsListPage = lazy(() =>
  import('@/presentation/pages/bookings/list').then((m) => ({ default: m.BookingsListPage })),
)
const BookingsCalendarPage = lazy(() =>
  import('@/presentation/pages/bookings/calendar').then((m) => ({
    default: m.BookingsCalendarPage,
  })),
)
const ClinicDoctorsPage = lazy(() =>
  import('@/presentation/pages/clinic/doctors').then((m) => ({ default: m.ClinicDoctorsPage })),
)
const ClinicServicesPage = lazy(() =>
  import('@/presentation/pages/clinic/services').then((m) => ({ default: m.ClinicServicesPage })),
)
const ClinicDepartmentsPage = lazy(() =>
  import('@/presentation/pages/clinic/departments').then((m) => ({
    default: m.ClinicDepartmentsPage,
  })),
)
const ClinicSchedulePage = lazy(() =>
  import('@/presentation/pages/clinic/schedule').then((m) => ({ default: m.ClinicSchedulePage })),
)
const CustomersPage = lazy(() =>
  import('@/presentation/pages/customers/list').then((m) => ({ default: m.CustomersPage })),
)
const CustomerProfilePage = lazy(() =>
  import('@/presentation/pages/customers/profile').then((m) => ({ default: m.CustomerProfilePage })),
)
const AgentsListPage = lazy(() =>
  import('@/presentation/pages/agents/list').then((m) => ({ default: m.AgentsListPage })),
)
const AgentDetailPage = lazy(() =>
  import('@/presentation/pages/agents/detail').then((m) => ({ default: m.AgentDetailPage })),
)
const KnowledgePage = lazy(() =>
  import('@/presentation/pages/agents/knowledge').then((m) => ({ default: m.KnowledgePage })),
)
const WorkflowsPage = lazy(() =>
  import('@/presentation/pages/agents/workflows').then((m) => ({ default: m.WorkflowsPage })),
)
const WorkflowDetailPage = lazy(() =>
  import('@/presentation/pages/agents/workflow-detail').then((m) => ({
    default: m.WorkflowDetailPage,
  })),
)
const ToolsPage = lazy(() =>
  import('@/presentation/pages/agents/tools').then((m) => ({ default: m.ToolsPage })),
)
const PlaygroundPage = lazy(() =>
  import('@/presentation/pages/agents/playground').then((m) => ({ default: m.PlaygroundPage })),
)
const WhatsAppPage = lazy(() =>
  import('@/presentation/pages/channels/whatsapp').then((m) => ({ default: m.WhatsAppPage })),
)
const AnalyticsShell = lazy(() =>
  import('@/presentation/pages/analytics/analytics-shell').then((m) => ({
    default: m.AnalyticsShell,
  })),
)
const SettingsShell = lazy(() =>
  import('@/presentation/pages/settings/settings-shell').then((m) => ({
    default: m.SettingsShell,
  })),
)
const TelegramPage = lazy(() =>
  import('@/presentation/pages/channels/telegram').then((m) => ({ default: m.TelegramPage })),
)
const AnalyticsPerformancePage = lazy(() =>
  import('@/presentation/pages/analytics/performance').then((m) => ({
    default: m.AnalyticsPerformancePage,
  })),
)
const AnalyticsInsightsPage = lazy(() =>
  import('@/presentation/pages/analytics/insights').then((m) => ({
    default: m.AnalyticsInsightsPage,
  })),
)
const AnalyticsUnansweredPage = lazy(() =>
  import('@/presentation/pages/analytics/unanswered').then((m) => ({
    default: m.AnalyticsUnansweredPage,
  })),
)
const AnalyticsCsatPage = lazy(() =>
  import('@/presentation/pages/analytics/csat').then((m) => ({ default: m.AnalyticsCsatPage })),
)
const SettingsGeneralPage = lazy(() =>
  import('@/presentation/pages/settings/general').then((m) => ({ default: m.SettingsGeneralPage })),
)
const SettingsTeamPage = lazy(() =>
  import('@/presentation/pages/settings/team').then((m) => ({ default: m.SettingsTeamPage })),
)
const SettingsRolesPage = lazy(() =>
  import('@/presentation/pages/settings/roles').then((m) => ({ default: m.SettingsRolesPage })),
)
const SettingsHoursPage = lazy(() =>
  import('@/presentation/pages/settings/hours').then((m) => ({ default: m.SettingsHoursPage })),
)
const SettingsNotificationsPage = lazy(() =>
  import('@/presentation/pages/settings/notifications').then((m) => ({
    default: m.SettingsNotificationsPage,
  })),
)
const SettingsApiPage = lazy(() =>
  import('@/presentation/pages/settings/api').then((m) => ({ default: m.SettingsApiPage })),
)
const KitGalleryPage = lazy(() =>
  import('@/presentation/pages/dev').then((m) => ({ default: m.KitGalleryPage })),
)

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: ROUTES.ROOT, element: <Navigate to={ROUTES.OVERVIEW} replace /> },
      {
        element: <PublicRoute />,
        children: [{ path: ROUTES.LOGIN, element: <LoginPage /> }],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: ROUTES.KIT, element: <KitGalleryPage /> },
              { path: ROUTES.OVERVIEW, element: <OverviewPage /> },
              { path: ROUTES.INBOX.ALL, element: <InboxAllPage /> },
              { path: `${ROUTES.INBOX.ALL}/:conversationId`, element: <InboxAllPage /> },
              { path: ROUTES.INBOX.AI, element: <InboxAiPage /> },
              { path: `${ROUTES.INBOX.AI}/:conversationId`, element: <InboxAiPage /> },
              { path: ROUTES.INBOX.WAITING, element: <InboxWaitingPage /> },
              { path: `${ROUTES.INBOX.WAITING}/:conversationId`, element: <InboxWaitingPage /> },
              { path: ROUTES.INBOX.HUMAN, element: <InboxHumanPage /> },
              { path: `${ROUTES.INBOX.HUMAN}/:conversationId`, element: <InboxHumanPage /> },
              { path: ROUTES.INBOX.RESOLVED, element: <InboxResolvedPage /> },
              { path: `${ROUTES.INBOX.RESOLVED}/:conversationId`, element: <InboxResolvedPage /> },
              { path: ROUTES.INBOX.THREAD, element: <InboxThreadPage /> },
              { path: ROUTES.HANDOFFS.ALL, element: <HandoffsAllPage /> },
              { path: ROUTES.HANDOFFS.CALL_CENTER, element: <HandoffsCallCenterPage /> },
              { path: ROUTES.HANDOFFS.RESULTS, element: <HandoffsResultsPage /> },
              { path: ROUTES.HANDOFFS.CONTRACTS, element: <HandoffsContractsPage /> },
              { path: ROUTES.BOOKINGS.LIST, element: <BookingsListPage /> },
              { path: ROUTES.BOOKINGS.CALENDAR, element: <BookingsCalendarPage /> },
              { path: ROUTES.CLINIC.DOCTORS, element: <ClinicDoctorsPage /> },
              { path: ROUTES.CLINIC.SERVICES, element: <ClinicServicesPage /> },
              { path: ROUTES.CLINIC.DEPARTMENTS, element: <ClinicDepartmentsPage /> },
              { path: ROUTES.CLINIC.SCHEDULE, element: <ClinicSchedulePage /> },
              { path: ROUTES.ESCALATIONS.OPEN, element: <Navigate to={ROUTES.HANDOFFS.ALL} replace /> },
              { path: ROUTES.ESCALATIONS.MY, element: <Navigate to={ROUTES.HANDOFFS.ALL} replace /> },
              {
                path: ROUTES.ESCALATIONS.RESOLVED,
                element: <Navigate to={ROUTES.HANDOFFS.ALL} replace />,
              },
              { path: ROUTES.CUSTOMERS.LIST, element: <CustomersPage /> },
              { path: ROUTES.CUSTOMERS.PROFILE, element: <CustomerProfilePage /> },
              { path: ROUTES.AGENTS.LIST, element: <AgentsListPage /> },
              { path: ROUTES.AGENTS.DETAIL, element: <AgentDetailPage /> },
              { path: ROUTES.AGENTS.KNOWLEDGE, element: <KnowledgePage /> },
              { path: ROUTES.AGENTS.WORKFLOWS, element: <WorkflowsPage /> },
              { path: ROUTES.AGENTS.WORKFLOW_DETAIL, element: <WorkflowDetailPage /> },
              { path: ROUTES.AGENTS.TOOLS, element: <ToolsPage /> },
              { path: ROUTES.AGENTS.PLAYGROUND, element: <PlaygroundPage /> },
              { path: ROUTES.CHANNELS.WHATSAPP, element: <WhatsAppPage /> },
              { path: ROUTES.CHANNELS.TELEGRAM, element: <TelegramPage /> },
              {
                element: <AnalyticsShell />,
                children: [
                  { path: ROUTES.ANALYTICS.PERFORMANCE, element: <AnalyticsPerformancePage /> },
                  { path: ROUTES.ANALYTICS.INSIGHTS, element: <AnalyticsInsightsPage /> },
                  { path: ROUTES.ANALYTICS.UNANSWERED, element: <AnalyticsUnansweredPage /> },
                  { path: ROUTES.ANALYTICS.CSAT, element: <AnalyticsCsatPage /> },
                ],
              },
              {
                element: <SettingsShell />,
                children: [
                  { path: ROUTES.SETTINGS.GENERAL, element: <SettingsGeneralPage /> },
                  { path: ROUTES.SETTINGS.TEAM, element: <SettingsTeamPage /> },
                  { path: ROUTES.SETTINGS.ROLES, element: <SettingsRolesPage /> },
                  { path: ROUTES.SETTINGS.HOURS, element: <SettingsHoursPage /> },
                  { path: ROUTES.SETTINGS.NOTIFICATIONS, element: <SettingsNotificationsPage /> },
                  { path: ROUTES.SETTINGS.API, element: <SettingsApiPage /> },
                ],
              },
            ],
          },
        ],
      },
      { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
])
