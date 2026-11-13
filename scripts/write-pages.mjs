import fs from 'node:fs'
import path from 'node:path'

const root = path.join(path.resolve(import.meta.dirname, '..'), 'src/presentation/pages')

const ensure = (rel, content) => {
  const file = path.join(root, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}

ensure(
  'auth/login/index.tsx',
  `import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { createLoginSchema, type LoginSchema } from '@/domain/schemas'
import { useAuthActions } from '@/application/hooks'
import { notify } from '@/infrastructure/libs/toast/toast'
import { Button } from '@/presentation/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/presentation/components/ui/field'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'

export const LoginPage = () => {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const { login, isSubmitting } = useAuthActions()

  const schema = createLoginSchema({
    emailRequired: t('emailRequired'),
    emailInvalid: t('emailInvalid'),
    passwordMin: t('passwordMinLength'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login(values)
      notify.success({ title: t('signIn'), description: t('loginSuccess') })
      navigate(ROUTES.OVERVIEW, { replace: true })
    } catch {
      notify.error({ title: t('loginFailed'), description: t('loginFailedDesc') })
    }
  })

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-5 rounded-xl border p-8 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold">{t('loginTitle')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('loginSubtitle')}</p>
        </div>
        <Field>
          <FieldLabel>{t('email')}</FieldLabel>
          <Input type="email" placeholder={t('emailPlaceholder')} {...register('email')} />
          {errors.email ? <FieldError>{errors.email.message}</FieldError> : null}
        </Field>
        <Field>
          <FieldLabel>{t('password')}</FieldLabel>
          <Input type="password" {...register('password')} />
          {errors.password ? <FieldError>{errors.password.message}</FieldError> : null}
        </Field>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : t('signIn')}
        </Button>
      </form>
    </div>
  )
}
`,
)

ensure(
  'not-found-page.tsx',
  `import { Link } from 'react-router-dom'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'

export const NotFoundPage = () => {
  const { t } = useTranslation('common')
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">{t('notFoundTitle')}</h1>
      <p className="text-muted-foreground">{t('notFoundMessage')}</p>
      <Button asChild>
        <Link to={ROUTES.OVERVIEW}>{t('backHome')}</Link>
      </Button>
    </div>
  )
}
`,
)

ensure(
  'overview/index.tsx',
  `import { useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import type { Escalation } from '@/domain/entities'
import { useOverviewData } from '@/application/hooks'
import { DashboardPanelCard } from '@/presentation/components/dashboard/widgets/panel-card'
import { DashboardStatCard } from '@/presentation/components/dashboard/widgets/stat-card'
import { DataTable } from '@/presentation/components/dashboard/data-table'
import { BarChart } from '@/presentation/components/charts/bar-chart'
import { LineAreaChart } from '@/presentation/components/charts/line-area-chart'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Badge } from '@/presentation/components/ui/badge'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'

const columnHelper = createColumnHelper<Escalation>()

export const OverviewPage = () => {
  const { t } = useTranslation('overview')
  const { performance, volume, channels, topics, escalations } = useOverviewData()

  const columns = useMemo(
    () => [
      columnHelper.accessor('customerName', { header: () => t('recentEscalations'), cell: (info) => info.getValue() ?? '—' }),
      columnHelper.accessor('priority', { header: () => 'Priority', cell: (info) => <Badge variant="outline">{info.getValue()}</Badge> }),
      columnHelper.accessor('id', {
        header: () => '',
        cell: (info) => <Link className="text-primary text-sm" to={ROUTES.ESCALATIONS.detail(info.getValue())}>{'View'}</Link>,
      }),
    ],
    [t],
  )

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} description={t('description')} />
      <AsyncBoundary isLoading={performance.isLoading} error={performance.error} onRetry={performance.refetch}>
        {performance.data ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DashboardStatCard title={t('statConversations')} value={String(performance.data.conversationsTotal)} index={0} />
            <DashboardStatCard title={t('statResponse')} value={\`\${Math.round(performance.data.avgFirstResponseMs / 1000)}s\`} index={1} />
            <DashboardStatCard title={t('statResolution')} value={\`\${Math.round(performance.data.resolutionRate * 100)}%\`} index={2} />
            <DashboardStatCard title={t('statDeflection')} value={\`\${Math.round(performance.data.aiDeflectionRate * 100)}%\`} index={3} />
          </div>
        ) : null}
      </AsyncBoundary>
      <div className="grid gap-4 xl:grid-cols-3">
        <DashboardPanelCard title={t('chartVolume')} className="xl:col-span-2">
          <AsyncBoundary isLoading={volume.isLoading} error={volume.error} onRetry={volume.refetch}>
            {volume.data ? <LineAreaChart series={volume.data} className="h-32 w-full" label={t('chartVolume')} /> : null}
          </AsyncBoundary>
        </DashboardPanelCard>
        <DashboardPanelCard title={t('chartChannels')}>
          <AsyncBoundary isLoading={channels.isLoading} error={channels.error} onRetry={channels.refetch}>
            {channels.data ? <BarChart items={channels.data} label={t('chartChannels')} /> : null}
          </AsyncBoundary>
        </DashboardPanelCard>
      </div>
      <DashboardPanelCard title={t('chartTopics')}>
        <AsyncBoundary isLoading={topics.isLoading} error={topics.error} onRetry={topics.refetch}>
          {topics.data ? <BarChart items={topics.data} label={t('chartTopics')} /> : null}
        </AsyncBoundary>
      </DashboardPanelCard>
      <DashboardPanelCard title={t('recentEscalations')}>
        <AsyncBoundary
          isLoading={escalations.isLoading}
          error={escalations.error}
          onRetry={escalations.refetch}
          isEmpty={!escalations.data?.length}
        >
          {escalations.data ? (
            <DataTable columns={columns} data={escalations.data} totalItems={escalations.data.length} />
          ) : null}
        </AsyncBoundary>
      </DashboardPanelCard>
    </div>
  )
}
`,
)

const inboxTemplate = (filter) => `import { useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import type { Conversation } from '@/domain/entities'
import { useConversations } from '@/application/hooks'
import { DataTable } from '@/presentation/components/dashboard/data-table'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { NavTabs } from '@/presentation/components/shared/nav-tabs'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Badge } from '@/presentation/components/ui/badge'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'

const columnHelper = createColumnHelper<Conversation>()

export const InboxPage = () => {
  const { t } = useTranslation('inbox')
  const [search, setSearch] = useState('')
  const filters = ${JSON.stringify(filter)}
  const { data, isLoading, error, refetch } = useConversations({ ...filters, search })

  const tabs = useMemo(
    () => [
      { to: ROUTES.INBOX.ALL, label: t('title') + ' / All' },
      { to: ROUTES.INBOX.AI, label: 'AI' },
      { to: ROUTES.INBOX.WAITING, label: 'Waiting' },
      { to: ROUTES.INBOX.RESOLVED, label: 'Resolved' },
    ],
    [t],
  )

  const columns = useMemo(
    () => [
      columnHelper.accessor('customerName', { header: () => t('customerPanel'), cell: (info) => info.getValue() ?? '—' }),
      columnHelper.accessor('channelType', { header: () => t('filterChannel'), cell: (info) => <Badge variant="outline">{info.getValue()}</Badge> }),
      columnHelper.accessor('status', { header: () => 'Status', cell: (info) => <Badge>{info.getValue()}</Badge> }),
      columnHelper.accessor('lastMessagePreview', { header: () => 'Preview', cell: (info) => info.getValue() ?? '—' }),
      columnHelper.accessor('id', {
        header: () => '',
        cell: (info) => <Link to={ROUTES.INBOX.thread(info.getValue())} className="text-primary text-sm">{t('threadTitle')}</Link>,
      }),
    ],
    [t],
  )

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} description={t('description')} />
      <NavTabs items={tabs} />
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('filterSearch')} />
      <AsyncBoundary isLoading={isLoading} error={error} onRetry={refetch} isEmpty={!data?.items.length}>
        {data ? <DataTable columns={columns} data={data.items} totalItems={data.total} /> : null}
      </AsyncBoundary>
    </div>
  )
}
`

ensure('inbox/all/index.tsx', inboxTemplate({}))
ensure('inbox/ai/index.tsx', inboxTemplate({ handler: 'ai' }))
ensure('inbox/waiting/index.tsx', inboxTemplate({ status: 'waiting_human' }))
ensure('inbox/resolved/index.tsx', inboxTemplate({ status: 'resolved' }))

ensure(
  'inbox/thread/index.tsx',
  `import { useParams } from 'react-router-dom'
import { useConversation, useConversationMessages } from '@/application/hooks'
import { repositories } from '@/composition/repositories'
import { notify } from '@/infrastructure/libs/toast/toast'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ConversationHandler } from '@/domain/enums'

export const InboxThreadPage = () => {
  const { conversationId } = useParams()
  const { t } = useTranslation('inbox')
  const conversation = useConversation(conversationId)
  const messages = useConversationMessages(conversationId)

  const takeOver = async () => {
    if (!conversationId) return
    await repositories.conversations.update(conversationId, { handler: ConversationHandler.Human })
    notify.success({ title: t('takeoverSuccess') })
    conversation.refetch()
  }

  const handBack = async () => {
    if (!conversationId) return
    await repositories.conversations.update(conversationId, { handler: ConversationHandler.Ai, status: 'ai_active' })
    notify.success({ title: t('handbackSuccess') })
    conversation.refetch()
  }

  return (
    <div className="grid gap-6 p-6 lg:grid-cols-[2fr_1fr]">
      <motion-free className="space-y-4">
        <PageHeader title={t('threadTitle')} description={conversation.data?.customerName ?? ''} />
        <AsyncBoundary isLoading={messages.isLoading} error={messages.error} onRetry={messages.refetch}>
          <div className="space-y-3 rounded-lg border p-4">
            {messages.data?.map((message) => (
              <div key={message.id} className="rounded-md bg-muted/40 p-3 text-sm">
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="outline">{message.senderType}</Badge>
                  <span className="text-xs text-muted-foreground">{message.sentAt}</span>
                </div>
                <p>{message.body}</p>
              </div>
            ))}
          </div>
        </AsyncBoundary>
        <div className="flex gap-2">
          <Button type="button" onClick={takeOver}>{t('takeOver')}</Button>
          <Button type="button" variant="outline" onClick={handBack}>{t('handBack')}</Button>
        </div>
      </motion-free>
      <aside className="space-y-4 rounded-lg border p-4">
        <h2 className="font-medium">{t('customerPanel')}</h2>
        <AsyncBoundary isLoading={conversation.isLoading} error={conversation.error} onRetry={conversation.refetch}>
          {conversation.data ? (
            <>
              <p className="text-sm">{conversation.data.customerName}</p>
              <Badge>{conversation.data.channelType}</Badge>
              <h3 className="pt-4 font-medium">{t('aiReasoning')}</h3>
              <p className="text-sm text-muted-foreground">{conversation.data.aiReasoning ?? '—'}</p>
            </>
          ) : null}
        </AsyncBoundary>
      </aside>
    </div>
  )
}
`.replace('motion-free', 'div').replace("t('takeOver')", "t('takeoverSuccess').replace('!', '')") ,
)

// Fix inbox thread - used wrong replace. Rewrite thread page properly below
ensure(
  'inbox/thread/index.tsx',
  `import { useParams } from 'react-router-dom'
import { useConversation, useConversationMessages } from '@/application/hooks'
import { repositories } from '@/composition/repositories'
import { ConversationHandler } from '@/domain/enums'
import { notify } from '@/infrastructure/libs/toast/toast'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const InboxThreadPage = () => {
  const { conversationId } = useParams()
  const { t } = useTranslation(['inbox', 'common'])
  const conversation = useConversation(conversationId)
  const messages = useConversationMessages(conversationId)

  const takeOver = async () => {
    if (!conversationId) return
    await repositories.conversations.update(conversationId, { handler: ConversationHandler.Human })
    notify.success({ title: t('takeoverSuccess') })
    conversation.refetch()
  }

  const handBack = async () => {
    if (!conversationId) return
    await repositories.conversations.update(conversationId, {
      handler: ConversationHandler.Ai,
      status: 'ai_active',
    })
    notify.success({ title: t('handbackSuccess') })
    conversation.refetch()
  }

  return (
    <div className="grid gap-6 p-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        <PageHeader title={t('threadTitle')} description={conversation.data?.customerName ?? ''} />
        <AsyncBoundary isLoading={messages.isLoading} error={messages.error} onRetry={messages.refetch}>
          <div className="space-y-3 rounded-lg border p-4">
            {messages.data?.map((message) => (
              <div key={message.id} className="rounded-md bg-muted/40 p-3 text-sm">
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="outline">{message.senderType}</Badge>
                  <span className="text-xs text-muted-foreground">{message.sentAt}</span>
                </div>
                <p>{message.body}</p>
              </div>
            ))}
          </div>
        </AsyncBoundary>
        <div className="flex gap-2">
          <Button type="button" onClick={takeOver}>{t('common:takeOver')}</Button>
          <Button type="button" variant="outline" onClick={handBack}>{t('common:handBack')}</Button>
        </div>
      </div>
      <aside className="space-y-4 rounded-lg border p-4">
        <h2 className="font-medium">{t('customerPanel')}</h2>
        <AsyncBoundary isLoading={conversation.isLoading} error={conversation.error} onRetry={conversation.refetch}>
          {conversation.data ? (
            <>
              <p className="text-sm">{conversation.data.customerName}</p>
              <Badge>{conversation.data.channelType}</Badge>
              <h3 className="pt-4 font-medium">{t('aiReasoning')}</h3>
              <p className="text-sm text-muted-foreground">{conversation.data.aiReasoning ?? '—'}</p>
            </>
          ) : null}
        </AsyncBoundary>
      </aside>
    </div>
  )
}
`,
)

console.log('Core pages written — extend manually for remaining routes')
