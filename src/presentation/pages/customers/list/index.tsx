import { createColumnHelper } from '@tanstack/react-table'
import { Shield, Star, UserPlus, Users, UserCheck, HeartHandshake } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useCustomerActions,
  useCustomerStats,
  useCustomerTabCounts,
  useCustomers,
} from '@/application/hooks'
import type { Customer, CustomerListTab, CustomerStatus } from '@/domain/entities'
import { notify } from '@/infrastructure/libs/toast/toast'
import { exportVisibleRowsToCsv } from '@/presentation/components/kit/data-table/export-csv'
import {
  KitAvatarCell,
  KitChannelBadge,
  KitDataTable,
  KitPageHeader,
  KitRelativeTimeCell,
  KitStatusBadge,
  KitTagsCell,
  StatCard,
  StatsStrip,
} from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { cn } from '@/presentation/utils'

import { CustomerDrawer } from '../customer-drawer'

const columnHelper = createColumnHelper<Customer>()

const serviceKey = (id?: string) => {
  const map: Record<string, string> = {
    retina: 'serviceRetina',
    lasik: 'serviceLasik',
    pediatric: 'servicePediatric',
    optics: 'serviceOptics',
    cataract: 'serviceCataract',
  }
  return id ? (map[id] ?? 'serviceRetina') : 'serviceRetina'
}

const statusTone = (status: CustomerStatus) => {
  if (status === 'active') return 'success' as const
  if (status === 'blocked') return 'danger' as const
  return 'neutral' as const
}

const SatisfactionStars = ({ value }: { value: number }) => (
  <span className="inline-flex items-center gap-0.5" aria-label={`${value} / 5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'size-3.5',
          i < value ? 'fill-warning text-warning' : 'text-muted-foreground/40',
        )}
      />
    ))}
  </span>
)

export const CustomersPage = () => {
  const { t } = useTranslation('customers')
  const navigate = useNavigate()
  const [tab, setTab] = useState<CustomerListTab>('all')
  const [search, setSearch] = useState('')
  const [channel, setChannel] = useState<string | undefined>()
  const [tag, setTag] = useState<string | undefined>()
  const [serviceId, setServiceId] = useState<string | undefined>()
  const [hasInsurance, setHasInsurance] = useState<boolean | undefined>()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [active, setActive] = useState<Customer | null>(null)

  const filters = useMemo(
    () => ({
      tab,
      search: search || undefined,
      channel,
      tag,
      serviceId,
      hasInsurance,
      lastContactFrom: from || undefined,
      lastContactTo: to || undefined,
    }),
    [tab, search, channel, tag, serviceId, hasInsurance, from, to],
  )

  const list = useCustomers(filters)
  const stats = useCustomerStats()
  const counts = useCustomerTabCounts({
    search: filters.search,
    channel,
    tag,
    serviceId,
    hasInsurance,
    lastContactFrom: filters.lastContactFrom,
    lastContactTo: filters.lastContactTo,
  })
  const actions = useCustomerActions()

  const refresh = () => {
    list.refetch()
    stats.refetch()
    counts.refetch()
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('displayName', {
        id: 'customer',
        header: () => t('colCustomer'),
        cell: (info) => (
          <KitAvatarCell name={info.getValue()} subtitle={info.row.original.phone} />
        ),
      }),
      columnHelper.accessor('channels', {
        header: () => t('colChannels'),
        cell: (info) => (
          <div className="flex flex-wrap gap-1">
            {info.getValue().map((ch) => (
              <KitChannelBadge key={`${ch.channelType}-${ch.externalId}`} channel={ch.channelType} />
            ))}
          </div>
        ),
      }),
      columnHelper.accessor('tags', {
        header: () => t('colTags'),
        cell: (info) => <KitTagsCell tags={info.getValue()} />,
      }),
      columnHelper.accessor('lastServiceId', {
        header: () => t('colLastService'),
        cell: (info) =>
          info.getValue() ? (
            <KitStatusBadge tone="neutral" label={t(serviceKey(info.getValue()))} />
          ) : (
            '—'
          ),
      }),
      columnHelper.accessor('totalBookings', {
        header: () => t('colBookings'),
        cell: (info) => <span className="tabular-nums">{info.getValue()}</span>,
      }),
      columnHelper.accessor('totalConversations', {
        header: () => t('colConversations'),
        cell: (info) => <span className="tabular-nums">{info.getValue()}</span>,
      }),
      columnHelper.accessor('lastSeenAt', {
        header: () => t('colLastContact'),
        cell: (info) => <KitRelativeTimeCell date={info.getValue()} />,
      }),
      columnHelper.accessor('satisfaction', {
        header: () => t('colSatisfaction'),
        cell: (info) => <SatisfactionStars value={info.getValue()} />,
      }),
      columnHelper.accessor('status', {
        header: () => t('colStatus'),
        cell: (info) => {
          const status = info.getValue()
          const label =
            status === 'active'
              ? t('statusActive')
              : status === 'blocked'
                ? t('statusBlocked')
                : t('statusInactive')
          return <KitStatusBadge tone={statusTone(status)} label={label} />
        },
      }),
    ],
    [t],
  )

  const tabs: { id: CustomerListTab; label: string; count?: number }[] = [
    { id: 'all', label: t('tabAll'), count: counts.data?.all },
    { id: 'new', label: t('tabNew'), count: counts.data?.new },
    { id: 'returning', label: t('tabReturning'), count: counts.data?.returning },
    { id: 'insurance', label: t('tabInsurance'), count: counts.data?.insurance },
    { id: 'flagged', label: t('tabFlagged'), count: counts.data?.flagged },
  ]

  return (
    <div className="space-y-4 p-6">
      <KitPageHeader
        title={t('title')}
        description={t('description')}
        primaryActions={
          <Button
            type="button"
            onClick={() => {
              setActive(null)
              setDrawerOpen(true)
            }}
          >
            <UserPlus className="size-4" />
            {t('create')}
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs',
              tab === item.id
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-border text-muted-foreground',
            )}
          >
            {item.label}
            {typeof item.count === 'number' ? (
              <span className="rounded-full bg-muted px-1.5 tabular-nums">{item.count}</span>
            ) : null}
          </button>
        ))}
      </div>

      <StatsStrip>
        <StatCard
          icon={Users}
          label={t('statTotal')}
          value={stats.data?.total ?? 0}
          loading={stats.isLoading}
        />
        <StatCard
          icon={UserPlus}
          label={t('statNewMonth')}
          value={stats.data?.newThisMonth ?? 0}
          loading={stats.isLoading}
        />
        <StatCard
          icon={UserCheck}
          label={t('statActiveWeek')}
          value={stats.data?.activeThisWeek ?? 0}
          loading={stats.isLoading}
        />
        <StatCard
          icon={HeartHandshake}
          label={t('statInsurance')}
          value={stats.data?.withInsurance ?? 0}
          loading={stats.isLoading}
        />
        <StatCard
          icon={Shield}
          label={t('statAvgCsat')}
          value={stats.data?.avgCsat ?? 0}
          loading={stats.isLoading}
        />
      </StatsStrip>

      <div className="flex flex-wrap items-end gap-2">
        <Input
          className="max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
        />
        <select
          className="border-input bg-background h-9 rounded-control border px-2 text-sm"
          value={channel ?? 'all'}
          onChange={(e) => setChannel(e.target.value === 'all' ? undefined : e.target.value)}
        >
          <option value="all">{t('filterChannel')}</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="telegram">Telegram</option>
        </select>
        <select
          className="border-input bg-background h-9 rounded-control border px-2 text-sm"
          value={tag ?? 'all'}
          onChange={(e) => setTag(e.target.value === 'all' ? undefined : e.target.value)}
        >
          <option value="all">{t('filterTag')}</option>
          <option value="vip">vip</option>
          <option value="new">new</option>
          <option value="insurance">insurance</option>
          <option value="flagged">flagged</option>
          <option value="eye-care">eye-care</option>
          <option value="follow-up">follow-up</option>
        </select>
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
          value={
            hasInsurance === undefined ? 'all' : hasInsurance ? 'yes' : 'no'
          }
          onChange={(e) => {
            if (e.target.value === 'all') setHasInsurance(undefined)
            else setHasInsurance(e.target.value === 'yes')
          }}
        >
          <option value="all">{t('insuranceAny')}</option>
          <option value="yes">{t('insuranceYes')}</option>
          <option value="no">{t('insuranceNo')}</option>
        </select>
        <label className="text-muted-foreground flex flex-col gap-1 text-xs">
          {t('filterFrom')}
          <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="h-9" />
        </label>
        <label className="text-muted-foreground flex flex-col gap-1 text-xs">
          {t('filterTo')}
          <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="h-9" />
        </label>
      </div>

      <KitDataTable
        columns={columns}
        data={list.data?.items ?? []}
        getRowId={(row) => row.id}
        isLoading={list.isLoading}
        error={list.error}
        onRetry={list.refetch}
        onRowClick={(row) => navigate(ROUTES.CUSTOMERS.profile(row.id))}
        urlStateKey="customers"
        enableExport
        bulkActions={[
          {
            id: 'add-tag',
            label: t('addTag'),
            onAction: async (_rows, ids) => {
              const next = window.prompt(t('bulkTagPrompt'), 'follow-up')
              if (!next?.trim()) return
              await actions.addTags(ids, [next.trim()])
              notify.success({ title: t('tagSuccess') })
              refresh()
            },
          },
          {
            id: 'export',
            label: t('export'),
            onAction: (rows) => {
              exportVisibleRowsToCsv(
                ['id', 'displayName', 'phone', 'status', 'tags'],
                rows,
                (row) => [row.id, row.displayName, row.phone, row.status, row.tags.join('|')],
                'customers.csv',
              )
            },
          },
          {
            id: 'block',
            label: t('block'),
            variant: 'destructive',
            onAction: async (_rows, ids) => {
              await actions.bulkBlock(ids)
              notify.success({ title: t('blockSuccess') })
              refresh()
            },
          },
          {
            id: 'delete',
            label: t('delete'),
            variant: 'destructive',
            onAction: async (rows, ids) => {
              const snapshot = rows.map((row) => ({ ...row }))
              await actions.bulkDelete(ids)
              notify.success({
                title: t('deleteSuccess'),
                description: (
                  <button
                    type="button"
                    className="mt-1 text-sm font-medium text-primary underline-offset-2 hover:underline"
                    onClick={() => {
                      void Promise.all(
                        snapshot.map((row) => actions.create({ ...row, id: row.id })),
                      ).then(refresh)
                    }}
                  >
                    Undo
                  </button>
                ),
              })
              refresh()
            },
          },
        ]}
      />

      <CustomerDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        customer={active}
        onSaved={refresh}
      />
    </div>
  )
}
