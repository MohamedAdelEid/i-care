import fs from 'node:fs'
import path from 'node:path'

const root = path.join(path.resolve(import.meta.dirname, '..'), 'src/presentation/pages')

const ensure = (rel, content) => {
  const file = path.join(root, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}

ensure(
  'customers/profile/index.tsx',
  `import { useParams } from 'react-router-dom'
import { useCustomer } from '@/application/hooks'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Badge } from '@/presentation/components/ui/badge'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const CustomerProfilePage = () => {
  const { customerId } = useParams()
  const { t } = useTranslation('customers')
  const customer = useCustomer(customerId)

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('profileTitle')} description={customer.data?.displayName ?? ''} />
      <AsyncBoundary isLoading={customer.isLoading} error={customer.error} onRetry={customer.refetch}>
        {customer.data ? (
          <div className="space-y-4 rounded-lg border p-6">
            <p>{customer.data.phone}</p>
            <p>{customer.data.email ?? '—'}</p>
            <div className="flex flex-wrap gap-2">
              {customer.data.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            <h2 className="font-medium">{t('channels')}</h2>
            {customer.data.channels.map((channel) => (
              <p key={channel.externalId} className="text-sm">{channel.channelType}: {channel.externalId}</p>
            ))}
          </div>
        ) : null}
      </AsyncBoundary>
    </div>
  )
}
`,
)

ensure(
  'agents/list/index.tsx',
  `import { Link } from 'react-router-dom'
import { useAgents } from '@/application/hooks'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Badge } from '@/presentation/components/ui/badge'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'

export const AgentsListPage = () => {
  const { t } = useTranslation('agents')
  const agents = useAgents()

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} description={t('description')} />
      <AsyncBoundary isLoading={agents.isLoading} error={agents.error} onRetry={agents.refetch}>
        <div className="grid gap-4 md:grid-cols-2">
          {agents.data?.map((agent) => (
            <Link key={agent.id} to={ROUTES.AGENTS.detail(agent.id)} className="rounded-lg border p-4 hover:bg-muted/30">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-medium">{agent.name}</h2>
                <Badge variant={agent.isActive ? 'default' : 'outline'}>{agent.isActive ? t('active') : '—'}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{agent.description}</p>
            </Link>
          ))}
        </div>
      </AsyncBoundary>
    </div>
  )
}
`,
)

ensure(
  'agents/detail/index.tsx',
  `import { useParams } from 'react-router-dom'
import { useAgent } from '@/application/hooks'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const AgentDetailPage = () => {
  const { agentId } = useParams()
  const { t } = useTranslation('agents')
  const agent = useAgent(agentId)

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('detailTitle')} description={agent.data?.name ?? ''} />
      <AsyncBoundary isLoading={agent.isLoading} error={agent.error} onRetry={agent.refetch}>
        {agent.data ? (
          <motionless className="space-y-4 rounded-lg border p-6">
            <h2 className="font-medium">{t('instructions')}</h2>
            <p className="text-sm text-muted-foreground">{agent.data.persona}</p>
            <p className="text-sm">{agent.data.description}</p>
          </motionless>
        ) : null}
      </AsyncBoundary>
    </div>
  )
}
`.replace('motionless', 'div'),
)

ensure(
  'agents/knowledge/index.tsx',
  `import { useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import type { KnowledgeArticle } from '@/domain/entities'
import { useKnowledgeBase } from '@/application/hooks'
import { DataTable } from '@/presentation/components/dashboard/data-table'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'

const columnHelper = createColumnHelper<KnowledgeArticle>()

export const KnowledgePage = () => {
  const { t } = useTranslation('knowledgeBase')
  const [search, setSearch] = useState('')
  const { data, isLoading, error, refetch } = useKnowledgeBase(search)

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', { header: () => t('title'), cell: (info) => info.getValue() }),
      columnHelper.accessor('locale', { header: () => 'Locale', cell: (info) => info.getValue() }),
      columnHelper.accessor('updatedAt', { header: () => 'Updated', cell: (info) => info.getValue() }),
    ],
    [t],
  )

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} description={t('description')} />
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('search')} />
      <AsyncBoundary isLoading={isLoading} error={error} onRetry={refetch} isEmpty={!data?.items.length}>
        {data ? <DataTable columns={columns} data={data.items} enablePagination pageSize={10} /> : null}
      </AsyncBoundary>
    </div>
  )
}
`,
)

ensure(
  'agents/workflows/index.tsx',
  `import { Link } from 'react-router-dom'
import { useWorkflows } from '@/application/hooks'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'

export const WorkflowsPage = () => {
  const { t } = useTranslation('workflows')
  const workflows = useWorkflows()

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} description={t('description')} />
      <AsyncBoundary isLoading={workflows.isLoading} error={workflows.error} onRetry={workflows.refetch}>
        <motionless className="space-y-3">
          {workflows.data?.map((workflow) => (
            <Link key={workflow.id} to={ROUTES.AGENTS.workflowDetail(workflow.id)} className="block rounded-lg border p-4 hover:bg-muted/30">
              <h2 className="font-medium">{workflow.name}</h2>
              <p className="text-sm text-muted-foreground">{workflow.description}</p>
            </Link>
          ))}
        </motionless>
      </AsyncBoundary>
    </div>
  )
}
`.replace('motionless', 'div'),
)

ensure(
  'agents/workflow-detail/index.tsx',
  `import { useParams } from 'react-router-dom'
import { useWorkflow } from '@/application/hooks'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Badge } from '@/presentation/components/ui/badge'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const WorkflowDetailPage = () => {
  const { workflowId } = useParams()
  const { t } = useTranslation('workflows')
  const workflow = useWorkflow(workflowId)

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('steps')} description={workflow.data?.name ?? ''} />
      <AsyncBoundary isLoading={workflow.isLoading} error={workflow.error} onRetry={workflow.refetch}>
        <div className="grid gap-3 md:grid-cols-2">
          {workflow.data?.steps.map((step, index) => (
            <article key={step.id} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline">{index + 1}</Badge>
                <Badge>{step.kind}</Badge>
              </div>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>
      </AsyncBoundary>
    </div>
  )
}
`,
)

ensure(
  'agents/tools/index.tsx',
  `import { useAgentTools } from '@/application/hooks'
import { repositories } from '@/composition/repositories'
import { notify } from '@/infrastructure/libs/toast/toast'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Switch } from '@/presentation/components/ui/switch'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const ToolsPage = () => {
  const { t } = useTranslation('tools')
  const tools = useAgentTools()

  const toggle = async (id: string, enabled: boolean) => {
    await repositories.agents.setToolEnabled(id, enabled)
    notify.success({ title: t('toggleSuccess') })
    tools.refetch()
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} description={t('description')} />
      <AsyncBoundary isLoading={tools.isLoading} error={tools.error} onRetry={tools.refetch}>
        <div className="space-y-3">
          {tools.data?.map((tool) => (
            <div key={tool.id} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">{tool.name}</p>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
              <Switch checked={tool.enabled} onCheckedChange={(value) => toggle(tool.id, value)} />
            </div>
          ))}
        </div>
      </AsyncBoundary>
    </div>
  )
}
`,
)

ensure(
  'agents/playground/index.tsx',
  `import { useState } from 'react'
import { repositories } from '@/composition/repositories'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Button } from '@/presentation/components/ui/button'
import { Textarea } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const PlaygroundPage = () => {
  const { t } = useTranslation('playground')
  const [prompt, setPrompt] = useState('')
  const [reply, setReply] = useState('')
  const [isSending, setIsSending] = useState(false)

  const send = async () => {
    if (!prompt.trim()) return
    setIsSending(true)
  try {
      const response = await repositories.agents.playgroundReply('agent-eye-care', prompt)
      setReply(response)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} description={t('description')} />
      <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={t('prompt')} rows={4} />
      <Button type="button" onClick={send} disabled={isSending}>{t('send')}</Button>
      {reply ? <div className="rounded-lg border bg-muted/30 p-4 text-sm">{reply}</div> : null}
    </div>
  )
}
`,
)

ensure(
  'channels/whatsapp/index.tsx',
  `import { useState } from 'react'
import { useChannels } from '@/application/hooks'
import { repositories } from '@/composition/repositories'
import { ChannelType } from '@/domain/enums'
import { notify } from '@/infrastructure/libs/toast/toast'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Badge } from '@/presentation/components/ui/badge'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const WhatsAppPage = () => {
  const { t } = useTranslation('channels')
  const channels = useChannels()
  const [webhook, setWebhook] = useState('https://api.icare.local/webhooks/whatsapp')
  const item = channels.data?.find((channel) => channel.channelType === ChannelType.Whatsapp)

  const save = async () => {
    await repositories.channels.saveConfig(ChannelType.Whatsapp, { webhook })
    notify.success({ title: t('saveSuccess') })
    channels.refetch()
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('whatsappTitle')} description={t('description')} />
      <AsyncBoundary isLoading={channels.isLoading} error={channels.error} onRetry={channels.refetch}>
        {item ? (
          <div className="max-w-lg space-y-4 rounded-lg border p-6">
            <Badge>{item.status}</Badge>
            <p className="text-sm text-muted-foreground">{item.configSummary}</p>
            <Input value={webhook} onChange={(e) => setWebhook(e.target.value)} placeholder={t('webhook')} />
            <Button type="button" onClick={save}>{t('saveSuccess').replace(' saved', '')}</Button>
          </div>
        ) : null}
      </AsyncBoundary>
    </div>
  )
}
`,
)

ensure(
  'channels/telegram/index.tsx',
  `import { useState } from 'react'
import { useChannels } from '@/application/hooks'
import { repositories } from '@/composition/repositories'
import { ChannelType } from '@/domain/enums'
import { notify } from '@/infrastructure/libs/toast/toast'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Badge } from '@/presentation/components/ui/badge'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const TelegramPage = () => {
  const { t } = useTranslation('channels')
  const channels = useChannels()
  const [token, setToken] = useState('')
  const item = channels.data?.find((channel) => channel.channelType === ChannelType.Telegram)

  const save = async () => {
    await repositories.channels.saveConfig(ChannelType.Telegram, { token })
    notify.success({ title: t('saveSuccess') })
    channels.refetch()
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('telegramTitle')} description={t('description')} />
      <AsyncBoundary isLoading={channels.isLoading} error={channels.error} onRetry={channels.refetch}>
        {item ? (
          <div className="max-w-lg space-y-4 rounded-lg border p-6">
            <Badge variant="outline">{item.status}</Badge>
            <Input value={token} onChange={(e) => setToken(e.target.value)} placeholder={t('token')} />
            <Button type="button" onClick={save}>Save</Button>
          </div>
        ) : null}
      </AsyncBoundary>
    </div>
  )
}
`,
)

const analytics = (ns, hook) => `import { ${hook} } from '@/application/hooks'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { LineAreaChart } from '@/presentation/components/charts/line-area-chart'
import { BarChart } from '@/presentation/components/charts/bar-chart'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const ${hook.replace('use', '')}Page = () => {
  const { t } = useTranslation('${ns}')
  const query = ${hook}()

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('${ns}Title')} description={t('${ns}Description')} />
      <AsyncBoundary isLoading={query.isLoading} error={query.error} onRetry={query.refetch}>
        {query.data ? (
          <div className="rounded-lg border p-6">
            <pre className="text-xs">{JSON.stringify(query.data, null, 2)}</pre>
          </div>
        ) : null}
      </AsyncBoundary>
    </div>
  )
}
`

ensure('analytics/performance/index.tsx', analytics('analytics', 'useAnalyticsPerformance').replace('AnalyticsPerformancePage', 'AnalyticsPerformancePage').replace("t('analyticsTitle')", "t('performanceTitle')").replace("t('analyticsDescription')", "t('performanceDescription')"))
ensure(
  'analytics/performance/index.tsx',
  `import { useAnalyticsPerformance } from '@/application/hooks'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const AnalyticsPerformancePage = () => {
  const { t } = useTranslation('analytics')
  const query = useAnalyticsPerformance()
  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('performanceTitle')} description={t('performanceDescription')} />
      <AsyncBoundary isLoading={query.isLoading} error={query.error} onRetry={query.refetch}>
        {query.data ? <div className="grid gap-4 md:grid-cols-2">{Object.entries(query.data).map(([key, value]) => (
          <div key={key} className="rounded-lg border p-4 text-sm"><span className="text-muted-foreground">{key}</span><p className="font-medium">{String(value)}</p></div>
        ))}</div> : null}
      </AsyncBoundary>
    </div>
  )
}
`,
)

ensure(
  'analytics/insights/index.tsx',
  `import { useAnalyticsInsights } from '@/application/hooks'
import { LineAreaChart } from '@/presentation/components/charts/line-area-chart'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const AnalyticsInsightsPage = () => {
  const { t } = useTranslation('analytics')
  const query = useAnalyticsInsights()
  const series = query.data?.at(-1)?.series ?? []
  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('insightsTitle')} description={t('insightsDescription')} />
      <AsyncBoundary isLoading={query.isLoading} error={query.error} onRetry={query.refetch}>
        {series.length ? <LineAreaChart series={series} className="h-40 w-full" label={t('insightsTitle')} /> : null}
      </AsyncBoundary>
    </div>
  )
}
`,
)

ensure(
  'analytics/unanswered/index.tsx',
  `import { useAnalyticsUnanswered } from '@/application/hooks'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { BarChart } from '@/presentation/components/charts/bar-chart'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const AnalyticsUnansweredPage = () => {
  const { t } = useTranslation('analytics')
  const query = useAnalyticsUnanswered()
  const items = query.data?.map((item) => ({ label: item.topic, value: item.count })) ?? []
  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('unansweredTitle')} description={t('unansweredDescription')} />
      <AsyncBoundary isLoading={query.isLoading} error={query.error} onRetry={query.refetch}>
        {items.length ? <BarChart items={items} label={t('unansweredTitle')} /> : null}
      </AsyncBoundary>
    </div>
  )
}
`,
)

ensure(
  'analytics/csat/index.tsx',
  `import { useAnalyticsCsat } from '@/application/hooks'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { BarChart } from '@/presentation/components/charts/bar-chart'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const AnalyticsCsatPage = () => {
  const { t } = useTranslation('analytics')
  const query = useAnalyticsCsat()
  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('csatTitle')} description={t('csatDescription')} />
      <AsyncBoundary isLoading={query.isLoading} error={query.error} onRetry={query.refetch}>
        {query.data ? (
          <div className="space-y-4">
            <p className="text-3xl font-semibold">{query.data.score}</p>
            <BarChart items={query.data.distribution} label={t('csatTitle')} />
          </div>
        ) : null}
      </AsyncBoundary>
    </div>
  )
}
`,
)

console.log('Final pages written — settings pages still needed')
