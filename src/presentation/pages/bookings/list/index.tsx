import { createColumnHelper } from '@tanstack/react-table'
import { CalendarCheck, CalendarClock, CalendarX, CalendarDays, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  useBookingActions,
  useBookingStats,
  useBookingTabCounts,
  useBookings,
} from '@/application/hooks'
import type { Booking, BookingStatus } from '@/domain/entities'
import { notify } from '@/infrastructure/libs/toast/toast'
import { exportVisibleRowsToCsv } from '@/presentation/components/kit/data-table/export-csv'
import {
  KitAvatarCell,
  KitChannelBadge,
  KitDataTable,
  KitPageHeader,
  KitStatusBadge,
  StatCard,
  StatsStrip,
} from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { cn } from '@/presentation/utils'

import { BookingDrawer } from '../booking-drawer'

const columnHelper = createColumnHelper<Booking>()

const serviceKey = (id: string) => {
  const map: Record<string, string> = {
    retina: 'serviceRetina',
    lasik: 'serviceLasik',
    pediatric: 'servicePediatric',
    optics: 'serviceOptics',
    cataract: 'serviceCataract',
  }
  return map[id] ?? 'serviceRetina'
}

const statusLabelKey = (status: BookingStatus) => {
  switch (status) {
    case 'draft_ai':
      return 'statusDraft'
    case 'pending_confirmation':
      return 'statusPending'
    case 'confirmed':
      return 'statusConfirmed'
    case 'cancelled':
      return 'statusCancelled'
    default:
      return 'statusNoShow'
  }
}

export const BookingsListPage = () => {
  const { t } = useTranslation('bookings')
  const [status, setStatus] = useState<BookingStatus | 'all'>('all')
  const [serviceId, setServiceId] = useState<string | undefined>()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [active, setActive] = useState<Booking | null>(null)

  const filters = useMemo(() => ({ status, serviceId }), [status, serviceId])
  const list = useBookings(filters)
  const stats = useBookingStats()
  const counts = useBookingTabCounts({ serviceId })
  const actions = useBookingActions()

  const refresh = () => {
    list.refetch()
    stats.refetch()
    counts.refetch()
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', { header: () => t('colId') }),
      columnHelper.accessor('patientName', {
        id: 'patient',
        header: () => t('colPatient'),
        cell: (info) => <KitAvatarCell name={info.getValue()} subtitle={info.row.original.phone} />,
      }),
      columnHelper.accessor('serviceId', {
        header: () => t('colService'),
        cell: (info) => <KitStatusBadge tone="neutral" label={t(serviceKey(info.getValue()))} />,
      }),
      columnHelper.accessor('doctorName', {
        header: () => t('colDoctor'),
        cell: (info) => (
          <span className="text-sm">
            {info.getValue()}{' '}
            <span className="text-muted-foreground text-xs">({info.row.original.doctorDegree})</span>
          </span>
        ),
      }),
      columnHelper.accessor('day', { header: () => t('colDay') }),
      columnHelper.accessor('timeSlot', {
        header: () => t('colSlot'),
        cell: (info) => <KitStatusBadge tone="info" label={info.getValue()} />,
      }),
      columnHelper.accessor('cost', {
        header: () => t('colCost'),
        cell: (info) => <span className="tabular-nums">SAR {info.getValue()}</span>,
      }),
      columnHelper.accessor('channel', {
        header: () => t('colChannel'),
        cell: (info) =>
          info.getValue() === 'manual' ? (
            <KitStatusBadge tone="neutral" label="Manual" />
          ) : (
            <KitChannelBadge channel={info.getValue() === 'telegram' ? 'telegram' : 'whatsapp'} />
          ),
      }),
      columnHelper.accessor('attachmentCount', {
        header: () => t('colAttachments'),
        cell: (info) => <span className="tabular-nums">{info.getValue()}</span>,
      }),
      columnHelper.accessor('status', {
        header: () => t('colStatus'),
        cell: (info) => <KitStatusBadge tone="neutral" label={t(statusLabelKey(info.getValue()))} />,
      }),
    ],
    [t],
  )

  const tabs: { id: BookingStatus | 'all'; label: string; count?: number }[] = [
    { id: 'all', label: t('tabAll'), count: counts.data?.all },
    { id: 'draft_ai', label: t('tabDraft'), count: counts.data?.draft_ai },
    { id: 'pending_confirmation', label: t('tabPending'), count: counts.data?.pending_confirmation },
    { id: 'confirmed', label: t('tabConfirmed'), count: counts.data?.confirmed },
    { id: 'cancelled', label: t('tabCancelled'), count: counts.data?.cancelled },
  ]

  return (
    <div className="space-y-4 p-6">
      <KitPageHeader
        title={t('title')}
        description={t('description')}
        primaryActions={
          <div className="flex gap-2">
            <Button type="button" variant="outline" asChild>
              <Link to={ROUTES.BOOKINGS.CALENDAR}>{t('calendarNav')}</Link>
            </Button>
            <Button
              type="button"
              onClick={() => {
                setActive(null)
                setDrawerOpen(true)
              }}
            >
              <Plus className="size-4" />
              {t('create')}
            </Button>
          </div>
        }
      />

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStatus(tab.id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs',
              status === tab.id
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
        <StatCard icon={CalendarDays} label={t('statToday')} value={stats.data?.today ?? 0} loading={stats.isLoading} />
        <StatCard icon={CalendarClock} label={t('statWeek')} value={stats.data?.thisWeek ?? 0} loading={stats.isLoading} />
        <StatCard icon={CalendarClock} label={t('statPending')} value={stats.data?.pendingConfirmation ?? 0} loading={stats.isLoading} />
        <StatCard icon={CalendarCheck} label={t('statConfirmed')} value={stats.data?.confirmed ?? 0} loading={stats.isLoading} />
        <StatCard icon={CalendarX} label={t('statCancelled')} value={stats.data?.cancelled ?? 0} loading={stats.isLoading} />
      </StatsStrip>

      <select
        className="border-input bg-background h-9 rounded-control border px-2 text-sm"
        value={serviceId ?? 'all'}
        onChange={(e) => setServiceId(e.target.value === 'all' ? undefined : e.target.value)}
      >
        <option value="all">{t('colService')}</option>
        <option value="retina">{t('serviceRetina')}</option>
        <option value="lasik">{t('serviceLasik')}</option>
        <option value="pediatric">{t('servicePediatric')}</option>
        <option value="optics">{t('serviceOptics')}</option>
        <option value="cataract">{t('serviceCataract')}</option>
      </select>

      <KitDataTable
        columns={columns}
        data={list.data?.items ?? []}
        getRowId={(row) => row.id}
        isLoading={list.isLoading}
        error={list.error}
        onRetry={list.refetch}
        onRowClick={(row) => {
          setActive(row)
          setDrawerOpen(true)
        }}
        urlStateKey="bookings"
        enableExport
        bulkActions={[
          {
            id: 'confirm',
            label: t('confirm'),
            onAction: async (_rows, ids) => {
              await actions.bulkConfirm(ids)
              notify.success({ title: t('confirmSuccess') })
              refresh()
            },
          },
          {
            id: 'cancel',
            label: t('cancel'),
            variant: 'destructive',
            onAction: async (_rows, ids) => {
              await actions.bulkCancel(ids)
              notify.success({ title: t('cancelSuccess') })
              refresh()
            },
          },
          {
            id: 'remind',
            label: t('sendReminder'),
            onAction: async (_rows, ids) => {
              await actions.bulkRemind(ids)
              notify.success({ title: t('remindSuccess') })
            },
          },
          {
            id: 'export',
            label: t('export'),
            onAction: (rows) => {
              exportVisibleRowsToCsv(
                ['id', 'patientName', 'serviceId', 'day', 'timeSlot', 'status'],
                rows,
                (row) => [row.id, row.patientName, row.serviceId, row.day, row.timeSlot, row.status],
                'bookings.csv',
              )
            },
          },
        ]}
      />

      <BookingDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        booking={active}
        onSaved={refresh}
      />
    </div>
  )
}
