export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  KIT: '/_kit',
  OVERVIEW: '/overview',
  INBOX: {
    ALL: '/inbox/all',
    AI: '/inbox/ai',
    WAITING: '/inbox/waiting',
    HUMAN: '/inbox/human',
    RESOLVED: '/inbox/resolved',
    THREAD: '/inbox/:conversationId',
    tab: (tab: string) => `/inbox/${tab}`,
    conversation: (tab: string, conversationId: string) => `/inbox/${tab}/${conversationId}`,
    thread: (conversationId: string) => `/inbox/all/${conversationId}`,
  },
  HANDOFFS: {
    ALL: '/handoffs',
    CALL_CENTER: '/handoffs/call-center',
    RESULTS: '/handoffs/results',
    CONTRACTS: '/handoffs/contracts',
    department: (dept: string) => {
      if (dept === 'all') return '/handoffs'
      if (dept === 'call_center' || dept === 'call-center') return '/handoffs/call-center'
      return `/handoffs/${dept}`
    },
  },
  BOOKINGS: {
    LIST: '/bookings',
    CALENDAR: '/bookings/calendar',
  },
  CLINIC: {
    DOCTORS: '/clinic/doctors',
    SERVICES: '/clinic/services',
    DEPARTMENTS: '/clinic/departments',
    SCHEDULE: '/clinic/schedule',
  },
  ESCALATIONS: {
    OPEN: '/escalations/open',
    MY: '/escalations/my',
    RESOLVED: '/escalations/resolved',
    DETAIL: '/escalations/:id',
    detail: (id: string) => `/escalations/${id}`,
  },
  CUSTOMERS: {
    LIST: '/customers',
    PROFILE: '/customers/:customerId',
    profile: (customerId: string) => `/customers/${customerId}`,
  },
  AGENTS: {
    LIST: '/agents',
    DETAIL: '/agents/:agentId',
    detail: (agentId: string) => `/agents/${agentId}`,
    detailTab: (agentId: string, tab: string, workflowId?: string) => {
      const params = new URLSearchParams({ tab })
      if (workflowId) params.set('workflowId', workflowId)
      return `/agents/${agentId}?${params.toString()}`
    },
    KNOWLEDGE: '/agents/knowledge',
    WORKFLOWS: '/agents/workflows',
    WORKFLOW_DETAIL: '/agents/workflows/:workflowId',
    workflowDetail: (workflowId: string) => `/agents/workflows/${workflowId}`,
    TOOLS: '/agents/tools',
    PLAYGROUND: '/agents/playground',
  },
  CHANNELS: {
    WHATSAPP: '/channels/whatsapp',
    TELEGRAM: '/channels/telegram',
  },
  ANALYTICS: {
    PERFORMANCE: '/analytics/performance',
    INSIGHTS: '/analytics/insights',
    UNANSWERED: '/analytics/unanswered',
    CSAT: '/analytics/csat',
  },
  SETTINGS: {
    GENERAL: '/settings/general',
    TEAM: '/settings/team',
    ROLES: '/settings/roles',
    HOURS: '/settings/hours',
    NOTIFICATIONS: '/settings/notifications',
    API: '/settings/api',
  },
  NOT_FOUND: '*',
} as const
