import { createColumnHelper } from '@tanstack/react-table'
import { Plus, Stethoscope, UserCheck, Users, Wallet } from 'lucide-react'
import { useMemo, useState } from 'react'

import {
  useClinicActions,
  useClinicDoctorStats,
  useClinicDoctors,
} from '@/application/hooks'
import type { Doctor } from '@/domain/entities'
import { notify } from '@/infrastructure/libs/toast/toast'
import { exportVisibleRowsToCsv } from '@/presentation/components/kit/data-table/export-csv'
import {
  KitAvatarCell,
  KitDataTable,
  KitPageHeader,
  KitStatusBadge,
  StatCard,
  StatsStrip,
} from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { DoctorDrawer } from './doctor-drawer'

const columnHelper = createColumnHelper<Doctor>()

const DAY_KEYS = ['daySat', 'daySun', 'dayMon', 'dayTue', 'dayWed', 'dayThu', 'dayFri'] as const

export const ClinicDoctorsPage = () => {
  const { t } = useTranslation('clinic')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [active, setActive] = useState<Doctor | null>(null)
  const list = useClinicDoctors()
  const stats = useClinicDoctorStats()
  const actions = useClinicActions()

  const refresh = () => {
    list.refetch()
    stats.refetch()
  }

  const degreeLabel = (degree: Doctor['degree']) => {
    if (degree === 'professor') return t('degreeProfessor')
    if (degree === 'consultant') return t('degreeConsultant')
    return t('degreeSpecialist')
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => t('colDoctor'),
        cell: (info) => (
          <KitAvatarCell name={info.getValue()} subtitle={info.row.original.specialty} />
        ),
      }),
      columnHelper.accessor('degree', {
        header: () => t('colDegree'),
        cell: (info) => <KitStatusBadge tone="info" label={degreeLabel(info.getValue())} />,
      }),
      columnHelper.accessor('specialty', { header: () => t('colSpecialty') }),
      columnHelper.accessor('availableDays', {
        header: () => t('colDays'),
        cell: (info) => (
          <div className="flex flex-wrap gap-1">
            {info.getValue().map((day) => (
              <KitStatusBadge key={day} tone="neutral" label={t(DAY_KEYS[day] ?? 'daySat')} />
            ))}
          </div>
        ),
      }),
      columnHelper.accessor('slotGrid', {
        header: () => t('colSlots'),
        cell: (info) => {
          const count = Object.entries(info.getValue()).reduce(
            (sum, [day, slots]) => (day === '5' ? sum : sum + (slots?.length ?? 0)),
            0,
          )
          return <span className="tabular-nums">{count}</span>
        },
      }),
      columnHelper.accessor('consultationPrice', {
        header: () => t('colPrice'),
        cell: (info) => <span className="tabular-nums">EGP {info.getValue()}</span>,
      }),
      columnHelper.accessor('status', {
        header: () => t('colStatus'),
        cell: (info) => (
          <KitStatusBadge
            tone={info.getValue() === 'active' ? 'success' : 'neutral'}
            label={info.getValue() === 'active' ? t('statusActive') : t('statusInactive')}
          />
        ),
      }),
      columnHelper.accessor('bookingsCount', {
        header: () => t('colBookings'),
        cell: (info) => <span className="tabular-nums">{info.getValue()}</span>,
      }),
    ],
    [t],
  )

  return (
    <div className="space-y-4 p-6">
      <KitPageHeader
        title={t('doctorsTitle')}
        description={t('doctorsDescription')}
        primaryActions={
          <Button
            type="button"
            onClick={() => {
              setActive(null)
              setDrawerOpen(true)
            }}
          >
            <Plus className="size-4" />
            {t('createDoctor')}
          </Button>
        }
      />

      <StatsStrip>
        <StatCard icon={Users} label={t('statTotal')} value={stats.data?.total ?? 0} loading={stats.isLoading} />
        <StatCard icon={UserCheck} label={t('statActive')} value={stats.data?.active ?? 0} loading={stats.isLoading} />
        <StatCard icon={Stethoscope} label={t('statProfessors')} value={stats.data?.professors ?? 0} loading={stats.isLoading} />
        <StatCard icon={Wallet} label={t('statAvgPrice')} value={stats.data?.avgPrice ?? 0} loading={stats.isLoading} />
      </StatsStrip>

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
        urlStateKey="clinic-doctors"
        enableExport
        bulkActions={[
          {
            id: 'activate',
            label: t('activate'),
            onAction: async (_rows, ids) => {
              await actions.setDoctorsStatus(ids, 'active')
              refresh()
            },
          },
          {
            id: 'deactivate',
            label: t('deactivate'),
            onAction: async (_rows, ids) => {
              await actions.setDoctorsStatus(ids, 'inactive')
              refresh()
            },
          },
          {
            id: 'export',
            label: t('export'),
            onAction: (rows) => {
              exportVisibleRowsToCsv(
                ['id', 'name', 'degree', 'specialty', 'price', 'status'],
                rows,
                (row) => [
                  row.id,
                  row.name,
                  row.degree,
                  row.specialty,
                  String(row.consultationPrice),
                  row.status,
                ],
                'doctors.csv',
              )
              notify.success({ title: t('export') })
            },
          },
        ]}
      />

      <DoctorDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        doctor={active}
        onSaved={refresh}
      />
    </div>
  )
}
