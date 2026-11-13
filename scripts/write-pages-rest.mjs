import fs from 'node:fs'
import path from 'node:path'

const root = path.join(path.resolve(import.meta.dirname, '..'), 'src/presentation/pages')

const ensure = (rel, content) => {
  const file = path.join(root, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}

const inboxList = (filters, tab) => `import { useMemo, useState } from 'react'
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
const FILTERS = ${JSON.stringify(filters)} as const

export const InboxPage = () => {
  const { t } = useTranslation('inbox')
  const { t: tNav } = useTranslation('navigation')
  const { t: tCommon } = useTranslation('common')
  const [search, setSearch] = useState('')
  const { data, isLoading, error, refetch } = useConversations({ ...FILTERS, search })

  const tabs = useMemo(
    () => [
      { to: ROUTES.INBOX.ALL, label: tNav('inboxAll') },
      { to: ROUTES.INBOX.AI, label: tNav('inboxAi') },
      { to: ROUTES.INBOX.WAITING, label: tNav('inboxWaiting') },
      { to: ROUTES.INBOX.RESOLVED, label: tNav('inboxResolved') },
    ],
    [tNav],
  )

  const columns = useMemo(
    () => [
      columnHelper.accessor('customerName', { header: () => tCommon('customer'), cell: (info) => info.getValue() ?? '—' }),
      columnHelper.accessor('channelType', { header: () => tCommon('channel'), cell: (info) => <Badge variant="outline">{info.getValue()}</Badge> }),
      columnHelper.accessor('status', { header: () => tCommon('statusLabel'), cell: (info) => <Badge>{info.getValue()}</Badge> }),
      columnHelper.accessor('lastMessagePreview', { header: () => tCommon('preview'), cell: (info) => info.getValue() ?? '—' }),
      columnHelper.accessor('id', {
        header: () => '',
        cell: (info) => <Link to={ROUTES.INBOX.thread(info.getValue())} className="text-primary text-sm">{t('threadTitle')}</Link>,
      }),
    ],
    [t, tCommon],
  )

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} description={t('description')} />
      <NavTabs items={tabs} />
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('filterSearch')} />
      <AsyncBoundary isLoading={isLoading} error={error} onRetry={refetch} isEmpty={!data?.items.length}>
        {data ? <DataTable columns={columns} data={data.items} enablePagination pageSize={10} /> : null}
      </AsyncBoundary>
    </div>
  )
}
`

ensure('inbox/all/index.tsx', inboxList({}, 'all'))
ensure('inbox/ai/index.tsx', inboxList({ handler: 'ai' }, 'ai'))
ensure('inbox/waiting/index.tsx', inboxList({ status: 'waiting_human' }, 'waiting'))
ensure('inbox/resolved/index.tsx', inboxList({ status: 'resolved' }, 'resolved'))

ensure(
  'inbox/thread/index.tsx',
  `import { useParams } from 'react-router-dom'
import { useConversation, useConversationMessages } from '@/application/hooks'
import { repositories } from '@/composition/repositories'
import { ConversationHandler, ConversationStatus } from '@/domain/enums'
import { notify } from '@/infrastructure/libs/toast/toast'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const InboxThreadPage = () => {
  const { conversationId } = useParams()
  const { t } = useTranslation('inbox')
  const { t: tCommon } = useTranslation('common')
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
      status: ConversationStatus.AiActive,
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
          <Button type="button" onClick={takeOver}>{tCommon('takeOver')}</Button>
          <Button type="button" variant="outline" onClick={handBack}>{tCommon('handBack')}</Button>
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

const escalationList = (status) => `import { useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import type { Escalation } from '@/domain/entities'
import { useEscalations } from '@/application/hooks'
import { repositories } from '@/composition/repositories'
import { notify } from '@/infrastructure/libs/toast/toast'
import { DataTable } from '@/presentation/components/dashboard/data-table'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { NavTabs } from '@/presentation/components/shared/nav-tabs'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Badge } from '@/presentation/components/ui/badge'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'

const columnHelper = createColumnHelper<Escalation>()
const STATUS = ${JSON.stringify(status)}

export const EscalationsPage = () => {
  const { t } = useTranslation('escalations')
  const { t: tNav } = useTranslation('navigation')
  const { t: tCommon } = useTranslation('common')
  const [selected, setSelected] = useState<Escalation | null>(null)
  const { data, isLoading, error, refetch } = useEscalations({ status: STATUS })

  const tabs = useMemo(
    () => [
      { to: ROUTES.ESCALATIONS.OPEN, label: tNav('escalationsOpen') },
      { to: ROUTES.ESCALATIONS.MY, label: tNav('escalationsMy') },
      { to: ROUTES.ESCALATIONS.RESOLVED, label: tNav('escalationsResolved') },
    ],
    [tNav],
  )

  const take = async (id: string) => {
    await repositories.escalations.assign(id, 'user-supervisor')
    notify.success({ title: t('takeSuccess') })
    refetch()
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('customerName', { header: () => tCommon('customer'), cell: (info) => info.getValue() ?? '—' }),
      columnHelper.accessor('priority', { header: () => tCommon('priority'), cell: (info) => <Badge variant="outline">{info.getValue()}</Badge> }),
      columnHelper.accessor('reason', { header: () => t('reason'), cell: (info) => info.getValue() }),
      columnHelper.display({
        id: 'actions',
        cell: ({ row }) => (
          <motionless className="flex gap-2">
            <Button size="sm" variant="outline" type="button" onClick={() => setSelected(row.original)}>{tCommon('open')}</Button>
            <Button size="sm" type="button" onClick={() => take(row.original.id)}>{tCommon('assign')}</Button>
          </motionless>
        ),
      }),
    ],
    [t, tCommon],
  )

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} description={t('description')} />
      <NavTabs items={tabs} />
      <AsyncBoundary isLoading={isLoading} error={error} onRetry={refetch} isEmpty={!data?.items.length}>
        {data ? <DataTable columns={columns} data={data.items} enablePagination pageSize={10} /> : null}
      </AsyncBoundary>
      {selected ? (
        <aside className="rounded-lg border p-4">
          <h2 className="font-medium">{t('detailTitle')}</h2>
          <p className="text-sm text-muted-foreground">{selected.reason}</p>
          <Link className="text-primary text-sm" to={ROUTES.INBOX.thread(selected.conversationId)}>{t('title')}</Link>
        </aside>
      ) : null}
    </div>
  )
}
`.replaceAll('motionless', 'div')

ensure('escalations/open/index.tsx', escalationList('open'))
ensure('escalations/my/index.tsx', escalationList('my'))
ensure('escalations/resolved/index.tsx', escalationList('resolved'))

ensure(
  'customers/list/index.tsx',
  `import { useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import type { Customer } from '@/domain/entities'
import { useCustomers } from '@/application/hooks'
import { DataTable } from '@/presentation/components/dashboard/data-table'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { PageHeader } from '@/presentation/components/layout/page-header'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'

const columnHelper = createColumnHelper<Customer>()

export const CustomersPage = () => {
  const { t } = useTranslation('customers')
  const [search, setSearch] = useState('')
  const { data, isLoading, error, refetch } = useCustomers(search)

  const columns = useMemo(
    () => [
      columnHelper.accessor('displayName', { header: () => t('title'), cell: (info) => info.getValue() }),
      columnHelper.accessor('phone', { header: () => 'Phone', cell: (info) => info.getValue() }),
      columnHelper.accessor('id', {
        header: () => '',
        cell: (info) => <Link className="text-primary text-sm" to={ROUTES.CUSTOMERS.profile(info.getValue())}>{t('profileTitle')}</Link>,
      }),
    ],
    [t],
  )

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} description={t('description')} />
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('title')} />
      <AsyncBoundary isLoading={isLoading} error={error} onRetry={refetch} isEmpty={!data?.items.length}>
        {data ? <DataTable columns={columns} data={data.items} enablePagination pageSize={10} /> : null}
      </AsyncBoundary>
    </div>
  )
}
`,
)

console.log('Extended pages written')
