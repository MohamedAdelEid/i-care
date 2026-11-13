import { useCallback, useMemo, useState } from 'react'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import type { Escalation } from '@/domain/entities'
import { useEscalationActions, useEscalations } from '@/application/hooks'
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
const STATUS = 'resolved'

export const EscalationsPage = () => {
  const { t } = useTranslation('escalations')
  const { t: tNav } = useTranslation('navigation')
  const { t: tCommon } = useTranslation('common')
  const [selected, setSelected] = useState<Escalation | null>(null)
  const { data, isLoading, error, refetch } = useEscalations({ status: STATUS })
  const { assignToMe } = useEscalationActions()

  const tabs = useMemo(
    () => [
      { to: ROUTES.ESCALATIONS.OPEN, label: tNav('escalationsOpen') },
      { to: ROUTES.ESCALATIONS.MY, label: tNav('escalationsMy') },
      { to: ROUTES.ESCALATIONS.RESOLVED, label: tNav('escalationsResolved') },
    ],
    [tNav],
  )

  const take = useCallback(
    async (id: string) => {
      await assignToMe(id)
      notify.success({ title: t('takeSuccess') })
      refetch()
    },
    [assignToMe, refetch, t],
  )

  const columns = useMemo(
    () => [
      columnHelper.accessor('customerName', {
        header: () => tCommon('customer'),
        cell: (info) => info.getValue() ?? tCommon('emptyValue'),
      }),
      columnHelper.accessor('priority', {
        header: () => tCommon('priority'),
        cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
      }),
      columnHelper.accessor('reason', { header: () => t('reason'), cell: (info) => info.getValue() }),
      columnHelper.display({
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={() => setSelected(row.original)}
            >
              {tCommon('open')}
            </Button>
            <Button size="sm" type="button" onClick={() => void take(row.original.id)}>
              {tCommon('assign')}
            </Button>
          </div>
        ),
      }),
    ],
    [t, tCommon, take],
  ) as ColumnDef<Escalation, unknown>[]

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} description={t('description')} />
      <NavTabs items={tabs} />
      <AsyncBoundary
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        isEmpty={!data?.items.length}
      >
        {data ? <DataTable columns={columns} data={data.items} enablePagination pageSize={10} /> : null}
      </AsyncBoundary>
      {selected ? (
        <aside className="rounded-lg border p-4">
          <h2 className="font-medium">{t('detailTitle')}</h2>
          <p className="text-sm text-muted-foreground">{selected.reason}</p>
          <Link className="text-primary text-sm" to={ROUTES.INBOX.thread(selected.conversationId)}>
            {t('viewConversation')}
          </Link>
        </aside>
      ) : null}
    </div>
  )
}
