import { useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Bot,
  Clock,
  Download,
  MessageSquare,
  Smile,
  UserRound,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import {
  useLiveConversations,
  useOverviewDashboard,
} from '@/application/hooks/use-overview'
import type {
  OverviewDatePreset,
  OverviewDateRange,
  OverviewEscalationRow,
  OverviewKpi,
} from '@/domain/entities'
import { notify } from '@/infrastructure/libs/toast/toast'
import {
  AreaTrendChart,
  DonutChart,
  FunnelChart,
  Heatmap,
  KitAiBanner,
  KitAvatar,
  KitChannelBadge,
  KitDataTable,
  KitDateRangePicker,
  KitPageHeader,
  KitStatusBadge,
  RadialProgress,
  StatsStrip,
  StatCard,
  getReducedMotion,
} from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { useAuthStore } from '@/presentation/store/auth.store'
import { cn } from '@/presentation/utils'

import { downloadOverviewCsv } from './export-overview-csv'
import { OverviewPanel } from './panel'

const columnHelper = createColumnHelper<OverviewEscalationRow>()

const greetingKey = (hour: number) => {
  if (hour < 12) return 'greetingMorning'
  if (hour < 17) return 'greetingAfternoon'
  return 'greetingEvening'
}

const formatKpiValue = (kpi: OverviewKpi): number => kpi.value

export const OverviewPage = () => {
  const { t } = useTranslation('overview')
  const navigate = useNavigate()
  const userName = useAuthStore((s) => s.user?.name) ?? 'there'
  const reduceMotion = useReducedMotion() || getReducedMotion()

  const [range, setRange] = useState<OverviewDateRange>({ preset: '7d' })
  const [customOpen, setCustomOpen] = useState(false)

  const dashboard = useOverviewDashboard(range)
  const live = useLiveConversations({ intervalMs: 8000 })

  const now = new Date()
  const greeting = t(greetingKey(now.getHours()), { name: userName })
  const todayLabel = t('todayDate', { date: format(now, 'EEE, MMM d') })

  const setPreset = (preset: OverviewDatePreset) => {
    if (preset === 'custom') {
      setCustomOpen(true)
      setRange((prev) => ({ ...prev, preset: 'custom' }))
      return
    }
    setCustomOpen(false)
    setRange({ preset })
  }

  const dayLabels = [
    t('daySat'),
    t('daySun'),
    t('dayMon'),
    t('dayTue'),
    t('dayWed'),
    t('dayThu'),
    t('dayFri'),
  ]
  const slotLabels = [t('slotMorning'), t('slotMidday'), t('slotAfternoon'), t('slotEvening')]

  const columns = useMemo(
    () => [
      columnHelper.accessor('subject', {
        header: () => t('colSubject'),
        cell: (info) => (
          <Link
            className="text-primary text-sm hover:underline"
            to={ROUTES.ESCALATIONS.detail(info.row.original.id)}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor('priority', {
        header: () => t('colPriority'),
        cell: (info) => (
          <KitStatusBadge
            tone={info.getValue() === 'high' ? 'danger' : info.getValue() === 'normal' ? 'warning' : 'neutral'}
            label={info.getValue()}
          />
        ),
      }),
      columnHelper.accessor('status', {
        header: () => t('colStatus'),
        cell: (info) => <KitStatusBadge tone="info" label={info.getValue()} />,
      }),
      columnHelper.accessor('department', {
        header: () => t('colDepartment'),
        cell: (info) => {
          const dept = info.getValue()
          if (dept === 'call_center') return t('deptCallCenter')
          if (dept === 'contracts') return t('deptContracts')
          return t('deptResults')
        },
      }),
    ],
    [t],
  )

  const data = dashboard.data
  const loading = dashboard.isLoading

  const onExport = () => {
    if (!data) return
    downloadOverviewCsv(data)
    notify.success({
      title: t('exportSuccessTitle'),
      description: t('exportSuccessDescription'),
    })
  }

  const rangeActions = (
    <div className="flex flex-wrap items-center gap-2">
      {([
        ['today', 'rangeToday'],
        ['7d', 'range7d'],
        ['30d', 'range30d'],
        ['custom', 'rangeCustom'],
      ] as const).map(([preset, key]) => (
        <Button
          key={preset}
          type="button"
          size="sm"
          variant={range.preset === preset ? 'default' : 'outline'}
          onClick={() => setPreset(preset)}
        >
          {t(key)}
        </Button>
      ))}
      {customOpen || range.preset === 'custom' ? (
        <KitDateRangePicker
          from={range.from ? new Date(range.from) : undefined}
          to={range.to ? new Date(range.to) : undefined}
          onChange={({ from, to }) => {
            setRange({
              preset: 'custom',
              from: from?.toISOString(),
              to: to?.toISOString(),
            })
          }}
          className="h-8"
        />
      ) : null}
      <Button type="button" size="sm" variant="outline" onClick={onExport} disabled={!data}>
        <Download className="size-3.5" aria-hidden />
        {t('exportReport')}
      </Button>
    </div>
  )

  return (
    <div className="space-y-5 p-6">
      <KitPageHeader
        title={greeting}
        description={todayLabel}
        primaryActions={rangeActions}
      />

      <KitAiBanner
        count={data?.liveAiHandledCount ?? 0}
        message={t('aiBannerMessage', { count: data?.liveAiHandledCount ?? 0 })}
        actionLabel={t('viewLiveInbox')}
        onViewLog={() => navigate(ROUTES.INBOX.AI)}
        dismissible={false}
      />

      <StatsStrip>
        <StatCard
          icon={MessageSquare}
          label={t('statActive')}
          value={formatKpiValue(data?.stats.activeConversations ?? { value: 0, sparkline: [], trend: { direction: 'neutral', value: '0%' } })}
          sparkline={data?.stats.activeConversations.sparkline}
          trend={
            data
              ? {
                  ...data.stats.activeConversations.trend,
                  label: t('vsPrior'),
                }
              : undefined
          }
          loading={loading}
          tip={t('tipActive')}
        />
        <StatCard
          icon={Bot}
          label={t('statResolvedAi')}
          value={formatKpiValue(
            data?.stats.resolvedByAiPercent ?? {
              value: 0,
              sparkline: [],
              trend: { direction: 'neutral', value: '0%' },
              format: 'percent',
            },
          )}
          sparkline={data?.stats.resolvedByAiPercent.sparkline}
          trend={
            data
              ? { ...data.stats.resolvedByAiPercent.trend, label: t('vsPrior') }
              : undefined
          }
          loading={loading}
          tip={t('tipResolvedAi')}
        />
        <StatCard
          icon={UserRound}
          label={t('statWaiting')}
          value={formatKpiValue(
            data?.stats.waitingHuman ?? {
              value: 0,
              sparkline: [],
              trend: { direction: 'neutral', value: '0%' },
            },
          )}
          sparkline={data?.stats.waitingHuman.sparkline}
          trend={
            data ? { ...data.stats.waitingHuman.trend, label: t('vsPrior') } : undefined
          }
          loading={loading}
          tip={t('tipWaiting')}
        />
        <StatCard
          icon={Clock}
          label={t('statFirstResponse')}
          value={formatKpiValue(
            data?.stats.avgFirstResponseMinutes ?? {
              value: 0,
              sparkline: [],
              trend: { direction: 'neutral', value: '0%' },
              format: 'minutes',
            },
          )}
          sparkline={data?.stats.avgFirstResponseMinutes.sparkline}
          trend={
            data
              ? { ...data.stats.avgFirstResponseMinutes.trend, label: t('vsPrior') }
              : undefined
          }
          loading={loading}
          tip={t('tipFirstResponse')}
        />
        <StatCard
          icon={Smile}
          label={t('statCsat')}
          value={formatKpiValue(
            data?.stats.csat ?? {
              value: 0,
              sparkline: [],
              trend: { direction: 'neutral', value: '0%' },
              format: 'score',
            },
          )}
          sparkline={data?.stats.csat.sparkline}
          trend={data ? { ...data.stats.csat.trend, label: t('vsPrior') } : undefined}
          loading={loading}
          tip={t('tipCsat')}
        />
      </StatsStrip>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 xl:grid-cols-12">
        <OverviewPanel
          title={t('sectionVolume')}
          tip={t('tipVolume')}
          className="md:col-span-6 xl:col-span-8"
          isLoading={loading}
          error={dashboard.error}
          onRetry={dashboard.refetch}
        >
          {data ? (
            <AreaTrendChart
              data={data.channelVolume.map((p) => ({
                label: p.label,
                whatsapp: p.whatsapp,
                telegram: p.telegram,
              }))}
              series={[
                { key: 'whatsapp', name: t('seriesWhatsapp'), stackId: 'ch' },
                { key: 'telegram', name: t('seriesTelegram'), stackId: 'ch' },
              ]}
              ariaLabel={t('sectionVolume')}
              showRangeToggle={false}
              framed={false}
              height={260}
            />
          ) : null}
        </OverviewPanel>

        <OverviewPanel
          title={t('sectionAiHuman')}
          tip={t('tipAiHuman')}
          className="md:col-span-6 xl:col-span-4"
          isLoading={loading}
          error={dashboard.error}
          onRetry={dashboard.refetch}
        >
          {data ? (
            <div className="flex flex-col items-center gap-3">
              <RadialProgress
                value={data.aiHumanSplit.aiPercent}
                max={100}
                label={t('aiHandled')}
                ariaLabel={t('sectionAiHuman')}
                size={180}
                framed={false}
              />
              <div className="text-muted-foreground flex w-full justify-between text-xs">
                <span>
                  {t('aiHandled')}: {data.aiHumanSplit.aiCount}
                </span>
                <span>
                  {t('humanHandled')}: {data.aiHumanSplit.humanCount}
                </span>
              </div>
            </div>
          ) : null}
        </OverviewPanel>

        <OverviewPanel
          title={t('sectionServices')}
          tip={t('tipServices')}
          className="md:col-span-6 xl:col-span-4"
          isLoading={loading}
          error={dashboard.error}
          onRetry={dashboard.refetch}
        >
          {data ? (
            <DonutChart
              data={data.serviceMix.map((s) => ({
                name: t(s.labelKey),
                value: s.value,
              }))}
              ariaLabel={t('sectionServices')}
              centerLabel={t('sectionServices')}
              height={240}
              framed={false}
            />
          ) : null}
        </OverviewPanel>

        <OverviewPanel
          title={t('sectionFunnel')}
          tip={t('tipFunnel')}
          className="md:col-span-6 xl:col-span-4"
          isLoading={loading}
          error={dashboard.error}
          onRetry={dashboard.refetch}
        >
          {data ? (
            <FunnelChart
              steps={data.bookingFunnel.map((s) => ({
                label: t(s.labelKey),
                value: s.value,
              }))}
              ariaLabel={t('sectionFunnel')}
              framed={false}
            />
          ) : null}
        </OverviewPanel>

        <OverviewPanel
          title={t('sectionHeatmap')}
          tip={t('tipHeatmap')}
          className="md:col-span-6 xl:col-span-4"
          isLoading={loading}
          error={dashboard.error}
          onRetry={dashboard.refetch}
        >
          {data ? (
            <div className="space-y-2">
              <Heatmap
                cells={data.busyHeatmap.map((c) => ({
                  day: c.dayIndex,
                  hour: c.slotIndex,
                  intensity: c.intensity,
                  closed: c.closed,
                }))}
                dayLabels={dayLabels}
                slotLabels={slotLabels}
                closedDays={[6]}
                ariaLabel={t('sectionHeatmap')}
                framed={false}
              />
              <p className="text-muted-foreground text-xs">{t('fridayClosed')}</p>
            </div>
          ) : null}
        </OverviewPanel>

        <OverviewPanel
          title={t('sectionLive')}
          tip={t('tipLive')}
          className="md:col-span-6 xl:col-span-7"
          isLoading={live.isLoading && !live.data}
          error={live.error}
          onRetry={live.refetch}
          isEmpty={!live.data?.length}
          emptyMessage={t('emptyLive')}
        >
          <ul className="divide-border divide-y">
            {(live.data ?? []).map((item) => (
              <motion.li
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                className="flex items-start gap-3 py-3"
              >
                <KitAvatar name={item.customerName} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-medium">{item.customerName}</p>
                    <KitChannelBadge channel={item.channel} />
                    <KitStatusBadge
                      tone={item.handledBy === 'ai' ? 'ai' : 'neutral'}
                      label={item.handledBy === 'ai' ? t('handledAi') : t('handledHuman')}
                    />
                  </div>
                  <p className="text-muted-foreground mt-0.5 truncate text-xs">{item.preview}</p>
                </div>
                <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                  {t('minutesAgo', { count: item.relativeMinutesAgo })}
                </span>
              </motion.li>
            ))}
          </ul>
        </OverviewPanel>

        <OverviewPanel
          title={t('sectionHandoff')}
          tip={t('tipHandoff')}
          className="md:col-span-6 xl:col-span-5"
          isLoading={loading}
          error={dashboard.error}
          onRetry={dashboard.refetch}
        >
          {data ? (
            <div className="grid gap-3">
              {data.handoffQueues.map((q) => {
                const label =
                  q.department === 'call_center'
                    ? t('deptCallCenter')
                    : q.department === 'contracts'
                      ? t('deptContracts')
                      : t('deptResults')
                return (
                  <div
                    key={q.department}
                    className={cn(
                      'rounded-control border border-border p-3',
                      q.slaTone === 'warning' && 'border-warning/40',
                      q.slaTone === 'critical' && 'border-destructive/40',
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{label}</p>
                      <KitStatusBadge
                        tone={
                          q.slaTone === 'critical'
                            ? 'danger'
                            : q.slaTone === 'warning'
                              ? 'warning'
                              : 'success'
                        }
                        label={t('waitingCount', { count: q.waitingCount })}
                      />
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {t('oldestWait', { minutes: q.oldestWaitMinutes })}
                    </p>
                  </div>
                )
              })}
            </div>
          ) : null}
        </OverviewPanel>

        <OverviewPanel
          title={t('sectionEscalations')}
          tip={t('tipEscalations')}
          className="md:col-span-6 xl:col-span-7"
          action={
            <Button type="button" variant="ghost" size="sm" asChild>
              <Link to={ROUTES.ESCALATIONS.OPEN}>{t('viewAll')}</Link>
            </Button>
          }
        >
          <KitDataTable
            columns={columns}
            data={data?.recentEscalations ?? []}
            getRowId={(row) => row.id}
            isLoading={loading}
            error={dashboard.error}
            onRetry={dashboard.refetch}
            emptyMessage={t('emptyEscalations')}
            hideToolbar
            hidePagination
            density="compact"
            urlStateKey="overview-esc"
            className="border-0 shadow-none"
          />
        </OverviewPanel>

        <OverviewPanel
          title={t('sectionUnanswered')}
          tip={t('tipUnanswered')}
          className="md:col-span-6 xl:col-span-5"
          isLoading={loading}
          error={dashboard.error}
          onRetry={dashboard.refetch}
          isEmpty={!data?.unansweredQuestions.length}
          emptyMessage={t('emptyUnanswered')}
        >
          <ul className="space-y-3">
            {(data?.unansweredQuestions ?? []).map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-3 rounded-control border border-border p-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{item.question}</p>
                  <p className="text-muted-foreground text-xs tabular-nums">{item.count}×</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    notify.success({
                      title: t('kbToastTitle'),
                      description: t('kbToastDescription', { question: item.question }),
                    })
                  }
                >
                  {t('addToKb')}
                </Button>
              </li>
            ))}
          </ul>
        </OverviewPanel>
      </div>
    </div>
  )
}
