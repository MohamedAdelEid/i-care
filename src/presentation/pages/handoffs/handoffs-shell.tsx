import { createColumnHelper } from '@tanstack/react-table'
import { AlertTriangle, Clock3, CheckCircle2, Timer, Inbox } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useHandoff,
  useHandoffActions,
  useHandoffStats,
  useHandoffTabCounts,
  useHandoffs,
} from '@/application/hooks'
import type { Escalation, HandoffDepartment } from '@/domain/entities'
import { EscalationPriority } from '@/domain/enums'
import { notify } from '@/infrastructure/libs/toast/toast'
import {
  KitAvatarCell,
  KitDataTable,
  KitEntityDrawer,
  KitPageHeader,
  KitSlaTimerCell,
  KitStatusBadge,
  KitTwoLineCell,
  StatCard,
  StatsStrip,
} from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { cn } from '@/presentation/utils'

const columnHelper = createColumnHelper<Escalation>()

export type HandoffDeptTab = 'all' | HandoffDepartment

const serviceKey = (id?: string) => {
  switch (id) {
    case 'lasik':
      return 'serviceLasik'
    case 'pediatric':
      return 'servicePediatric'
    case 'optics':
      return 'serviceOptics'
    case 'cataract':
      return 'serviceCataract'
    default:
      return 'serviceRetina'
  }
}

const slaStatus = (tone: Escalation['slaTone']) =>
  tone === 'critical' ? 'overdue' : tone === 'warning' ? 'due' : 'on_track'

const slaLabel = (dueAt: string) => {
  const mins = Math.round((new Date(dueAt).getTime() - Date.now()) / 60_000)
  if (mins < 0) return `${Math.abs(mins)}m overdue`
  return `${mins}m left`
}

export interface HandoffsShellProps {
  department: HandoffDeptTab
}

export const HandoffsShell = ({ department }: HandoffsShellProps) => {
  const { t } = useTranslation('handoffs')
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState<string | undefined>()
  const [serviceId, setServiceId] = useState<string | undefined>()
  const [selectedId, setSelectedId] = useState<string | undefined>()

  const filters = useMemo(
    () => ({
      department: department === 'all' ? undefined : department,
      search,
      priority,
      serviceId,
    }),
    [department, search, priority, serviceId],
  )

  const list = useHandoffs(filters)
  const stats = useHandoffStats(filters)
  const counts = useHandoffTabCounts({ search, priority, serviceId })
  const detail = useHandoff(selectedId)
  const actions = useHandoffActions()

  const goDept = (dept: HandoffDeptTab) => {
    navigate(ROUTES.HANDOFFS.department(dept))
  }

  const refresh = () => {
    list.refetch()
    stats.refetch()
    counts.refetch()
    detail.refetch()
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('customerName', {
        id: 'customer',
        header: () => t('colCustomer'),
        cell: (info) => (
          <KitAvatarCell name={info.getValue() ?? info.row.original.id} subtitle={info.row.original.patientPhone} />
        ),
      }),
      columnHelper.accessor('serviceId', {
        header: () => t('colService'),
        cell: (info) => <KitStatusBadge tone="neutral" label={t(serviceKey(info.getValue()))} />,
      }),
      columnHelper.accessor('department', {
        header: () => t('colDepartment'),
        cell: (info) => {
          const d = info.getValue()
          return d === 'call_center'
            ? t('tabCallCenter')
            : d === 'results'
              ? t('tabResults')
              : t('tabContracts')
        },
      }),
      columnHelper.accessor('aiSummary', {
        id: 'summary',
        header: () => t('colSummary'),
        cell: (info) => (
          <KitTwoLineCell primary={info.getValue()} secondary={info.row.original.aiSummaryDetail} />
        ),
      }),
      columnHelper.accessor('attachmentCount', {
        header: () => t('colAttachments'),
        cell: (info) => <span className="tabular-nums">{info.getValue()}</span>,
      }),
      columnHelper.accessor('priority', {
        header: () => t('colPriority'),
        cell: (info) => (
          <KitStatusBadge
            tone={info.getValue() === 'high' ? 'danger' : info.getValue() === 'normal' ? 'warning' : 'neutral'}
            label={info.getValue()}
            priority={info.getValue() === 'high' ? 'high' : info.getValue() === 'normal' ? 'medium' : 'low'}
            showDot
          />
        ),
      }),
      columnHelper.accessor('slaDueAt', {
        id: 'sla',
        header: () => t('colSla'),
        cell: (info) => (
          <KitSlaTimerCell
            status={slaStatus(info.row.original.slaTone)}
            label={slaLabel(info.getValue())}
          />
        ),
      }),
      columnHelper.accessor('assigneeName', {
        id: 'assignee',
        header: () => t('colAssignee'),
        cell: (info) =>
          info.getValue() ? (
            <KitAvatarCell name={info.getValue()!} />
          ) : (
            <span className="text-muted-foreground text-xs">{t('unassigned')}</span>
          ),
      }),
      columnHelper.accessor('status', {
        header: () => t('colStatus'),
        cell: (info) => (
          <KitStatusBadge
            tone={info.getValue() === 'resolved' ? 'success' : info.getValue() === 'assigned' ? 'info' : 'warning'}
            label={info.getValue()}
          />
        ),
      }),
    ],
    [t],
  )

  const tabs = [
    { id: 'all' as const, label: t('tabAll'), count: counts.data?.all },
    { id: 'call_center' as const, label: t('tabCallCenter'), count: counts.data?.call_center },
    { id: 'results' as const, label: t('tabResults'), count: counts.data?.results },
    { id: 'contracts' as const, label: t('tabContracts'), count: counts.data?.contracts },
  ]

  const handoff = detail.data

  return (
    <div className="space-y-4 p-6">
      <KitPageHeader title={t('title')} description={t('description')} />

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => goDept(tab.id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium',
              department === tab.id
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-border text-muted-foreground',
            )}
          >
            {tab.label}
            {typeof tab.count === 'number' ? (
              <span className="rounded-full bg-muted px-1.5 tabular-nums">{tab.count}</span>
            ) : null}
          </button>
        ))}
      </div>

      <StatsStrip>
        <StatCard icon={Inbox} label={t('statOpen')} value={stats.data?.open ?? 0} loading={stats.isLoading} />
        <StatCard
          icon={Clock3}
          label={t('statAvgWait')}
          value={stats.data?.avgWaitMinutes ?? 0}
          loading={stats.isLoading}
        />
        <StatCard
          icon={AlertTriangle}
          label={t('statSlaBreached')}
          value={stats.data?.slaBreached ?? 0}
          loading={stats.isLoading}
        />
        <StatCard
          icon={CheckCircle2}
          label={t('statResolvedToday')}
          value={stats.data?.resolvedToday ?? 0}
          loading={stats.isLoading}
        />
        <StatCard
          icon={Timer}
          label={t('statAvgHandling')}
          value={stats.data?.avgHandlingMinutes ?? 0}
          loading={stats.isLoading}
        />
      </StatsStrip>

      <div className="flex flex-wrap gap-2">
        <input
          className="border-input bg-background h-9 rounded-control border px-3 text-sm"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border-input bg-background h-9 rounded-control border px-2 text-sm"
          value={serviceId ?? 'all'}
          onChange={(e) => setServiceId(e.target.value === 'all' ? undefined : e.target.value)}
        >
          <option value="all">{t('filterService')}</option>
          <option value="retina">{t('serviceRetina')}</option>
          <option value="lasik">{t('serviceLasik')}</option>
          <option value="pediatric">{t('servicePediatric')}</option>
          <option value="optics">{t('serviceOptics')}</option>
          <option value="cataract">{t('serviceCataract')}</option>
        </select>
        <select
          className="border-input bg-background h-9 rounded-control border px-2 text-sm"
          value={priority ?? 'all'}
          onChange={(e) => setPriority(e.target.value === 'all' ? undefined : e.target.value)}
        >
          <option value="all">{t('filterPriority')}</option>
          <option value="high">high</option>
          <option value="normal">normal</option>
          <option value="low">low</option>
        </select>
      </div>

      <KitDataTable
        columns={columns}
        data={list.data?.items ?? []}
        getRowId={(row) => row.id}
        isLoading={list.isLoading}
        error={list.error}
        onRetry={list.refetch}
        onRowClick={(row) => setSelectedId(row.id)}
        searchPlaceholder="Search handoffs"
        enableExport
        urlStateKey="handoffs"
        bulkActions={[
          {
            id: 'assign',
            label: t('bulkAssign'),
            onAction: async (_rows, ids) => {
              await actions.bulkAssign(ids)
              notify.success({ title: t('assignSuccess') })
              refresh()
            },
          },
          {
            id: 'priority',
            label: t('bulkPriority'),
            onAction: async (_rows, ids) => {
              await actions.bulkChangePriority(ids, EscalationPriority.High)
              notify.success({ title: t('prioritySuccess') })
              refresh()
            },
          },
          {
            id: 'resolve',
            label: t('bulkResolve'),
            onAction: async (_rows, ids) => {
              await actions.bulkResolve(ids)
              notify.success({ title: t('resolveSuccess') })
              refresh()
            },
          },
        ]}
      />

      <KitEntityDrawer
        open={Boolean(selectedId)}
        onOpenChange={(open) => {
          if (!open) setSelectedId(undefined)
        }}
        title={t('drawerTitle')}
        description={handoff?.customerName}
        className="sm:max-w-lg"
      >
        {handoff ? (
          <div className="space-y-4 pt-4">
            <div className="space-y-1 text-sm">
              <p className="font-medium">{t('patient')}</p>
              <p>{handoff.customerName}</p>
              <p className="text-muted-foreground text-xs">{handoff.patientPhone}</p>
            </div>
            {handoff.doctorName ? (
              <div className="text-sm">
                <p className="font-medium">{t('doctor')}</p>
                <p>{handoff.doctorName}</p>
                <p className="text-muted-foreground text-xs">
                  {t('appointment')}: {handoff.appointmentDay} · {handoff.appointmentSlot}
                </p>
              </div>
            ) : null}
            {handoff.estimatedCost ? (
              <div className="text-sm">
                <p className="font-medium">{t('cost')}</p>
                <p>{handoff.estimatedCost}</p>
              </div>
            ) : null}
            <div className="text-sm">
              <p className="font-medium">{t('colSummary')}</p>
              <p>{handoff.aiSummary}</p>
              <p className="text-muted-foreground mt-1 text-xs">{handoff.aiSummaryDetail}</p>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">{t('timeline')}</p>
              <ul className="space-y-2">
                {(handoff.timeline ?? []).map((event) => (
                  <li key={event.id} className="text-muted-foreground text-xs">
                    {new Date(event.at).toLocaleString()} — {event.label}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">{t('notes')}</p>
              {(handoff.internalNotes ?? []).length ? (
                <ul className="space-y-2">
                  {handoff.internalNotes!.map((note) => (
                    <li key={note.id} className="rounded-control border border-border p-2 text-xs">
                      <p className="font-medium">{note.author}</p>
                      <p>{note.body}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-xs">{t('noNotes')}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 border-t border-border pt-3">
              <Button
                type="button"
                size="sm"
                onClick={() =>
                  void actions.accept(handoff.id).then(() => {
                    notify.success({ title: t('acceptSuccess') })
                    refresh()
                  })
                }
              >
                {t('accept')}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() =>
                  void actions
                    .reassign(handoff.id, 'team-2', 'Layla Agent')
                    .then(() => {
                      notify.success({ title: t('assignSuccess') })
                      refresh()
                    })
                }
              >
                {t('reassign')}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() =>
                  void actions.resolve(handoff.id).then(() => {
                    notify.success({ title: t('resolveSuccess') })
                    refresh()
                    setSelectedId(undefined)
                  })
                }
              >
                {t('resolve')}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() =>
                  void actions.returnToAi(handoff.id).then(() => {
                    notify.success({ title: t('returnSuccess') })
                    refresh()
                    setSelectedId(undefined)
                  })
                }
              >
                {t('returnToAi')}
              </Button>
            </div>
          </div>
        ) : null}
      </KitEntityDrawer>
    </div>
  )
}
