import type { ColumnDef } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import { Bot, Calendar, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { Language } from '@/domain/enums'
import {
  AreaTrendChart,
  DonutChart,
  FunnelChart,
  Heatmap,
  KitAiBanner,
  KitAvatarGroup,
  KitConfirmDialog,
  KitDataTable,
  KitEmptyState,
  KitEntityDrawer,
  KitFilterBar,
  KitFilterChip,
  KitPageHeader,
  KitStatusBadge,
  RadialProgress,
  RoundedBarChart,
  Sparkline,
  StatsStrip,
  type TrendRange,
} from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { useLanguageStore, useThemeStore } from '@/presentation/store'
import { cn } from '@/presentation/utils'

interface DemoRow {
  id: string
  name: string
  channel: string
  status: string
}

const DEMO_ROWS: DemoRow[] = Array.from({ length: 10 }, (_, i) => ({
  id: `row-${i + 1}`,
  name: `Customer ${i + 1}`,
  channel: i % 2 === 0 ? 'WhatsApp' : 'Telegram',
  status: i % 3 === 0 ? 'open' : 'resolved',
}))

const trendByRange: Record<TrendRange, { label: string; conversations: number; resolved: number }[]> = {
  '7D': [
    { label: 'Mon', conversations: 42, resolved: 30 },
    { label: 'Tue', conversations: 48, resolved: 35 },
    { label: 'Wed', conversations: 40, resolved: 32 },
    { label: 'Thu', conversations: 55, resolved: 41 },
    { label: 'Fri', conversations: 50, resolved: 38 },
    { label: 'Sat', conversations: 28, resolved: 20 },
    { label: 'Sun', conversations: 22, resolved: 18 },
  ],
  '30D': Array.from({ length: 10 }, (_, i) => ({
    label: `D${i + 1}`,
    conversations: 30 + i * 3,
    resolved: 20 + i * 2,
  })),
  '90D': Array.from({ length: 12 }, (_, i) => ({
    label: `W${i + 1}`,
    conversations: 120 + i * 8,
    resolved: 90 + i * 6,
  })),
}

function buildHeatmap(): { day: number; hour: number; intensity: number }[] {
  const cells: { day: number; hour: number; intensity: number }[] = []
  for (let day = 0; day < 7; day += 1) {
    for (let hour = 0; hour < 24; hour += 1) {
      const peak = hour >= 9 && hour <= 17 && day < 5
      cells.push({ day, hour, intensity: peak ? 4 + (hour % 5) : (hour % 3) + 1 })
    }
  }
  return cells
}

const GallerySection = ({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) => (
  <section className={cn('space-y-3', className)}>
    <h2 className="text-foreground text-lg font-semibold">{title}</h2>
    {children}
  </section>
)

const KitGalleryDevContent = () => {
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)
  const toggleTheme = useThemeStore((s) => s.toggle)
  const language = useLanguageStore((s) => s.language)
  const setLanguage = useLanguageStore((s) => s.setLanguage)

  const [range, setRange] = useState<TrendRange>('7D')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [stacked, setStacked] = useState(false)

  const columns = useMemo<ColumnDef<DemoRow>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'channel', header: 'Channel' },
      { accessorKey: 'status', header: 'Status' },
    ],
    [],
  )

  const heatmapCells = useMemo(() => buildHeatmap(), [])

  return (
    <div className="mx-auto max-w-6xl space-y-10 p-6 pb-16">
      <div className="rounded-card border border-dashed border-warning/40 bg-warning/5 p-3 text-sm">
        Development-only kit gallery (`/_kit`). Not linked from production navigation.
      </div>

      <KitPageHeader
        title="Kit component gallery"
        description="Preview shared presentation kit primitives, tables, overlays, and Recharts-based charts."
        primaryActions={
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => toggleTheme()}>
              Theme: {theme}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setLanguage(language === Language.English ? Language.Arabic : Language.English)
              }
            >
              Lang: {language}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setTheme('light')}>
              Force light
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setTheme('dark')}>
              Force dark
            </Button>
          </div>
        }
      />

      <GallerySection title="Page header">
        <p className="text-muted-foreground text-sm">See title block above.</p>
      </GallerySection>

      <GallerySection title="Stats strip">
        <StatsStrip
          items={[
            {
              label: 'Open threads',
              value: 128,
              trend: { direction: 'up', value: '12%' },
              icon: UserRound,
              sparkline: [4, 6, 5, 8, 9],
            },
            {
              label: 'AI handled',
              value: 64,
              trend: { direction: 'down', value: '3%' },
              icon: Bot,
              sparkline: [7, 6, 8, 7, 5],
            },
            {
              label: 'Bookings today',
              value: 18,
              trend: { direction: 'up', value: '5%' },
              icon: Calendar,
              sparkline: [2, 3, 4, 6, 5],
            },
          ]}
        />
      </GallerySection>

      <GallerySection title="AI banner">
        <KitAiBanner count={3} onViewLog={() => undefined} />
      </GallerySection>

      <GallerySection title="Status badges">
        <div className="flex flex-wrap gap-2">
          {(['success', 'warning', 'danger', 'info', 'neutral', 'ai'] as const).map((tone) => (
            <KitStatusBadge key={tone} tone={tone} label={tone} />
          ))}
        </div>
      </GallerySection>

      <GallerySection title="Avatars">
        <KitAvatarGroup
          max={4}
          items={[
            { name: 'Sara Hassan' },
            { name: 'Omar Ali' },
            { name: 'Lina Kareem' },
            { name: 'Youssef Nasser' },
            { name: 'Extra User' },
          ]}
        />
      </GallerySection>

      <GallerySection title="Filter bar">
        <KitFilterBar
          start={
            <>
              <KitFilterChip label="Channel" value="WhatsApp" onRemove={() => undefined} />
              <KitFilterChip label="Status" value="Open" onRemove={() => undefined} />
            </>
          }
          end={<Button size="sm">Apply</Button>}
        />
      </GallerySection>

      <GallerySection title="Data table">
        <KitDataTable columns={columns} data={DEMO_ROWS} getRowId={(row) => row.id} />
      </GallerySection>

      <GallerySection title="Overlays">
        <div className="flex gap-2">
          <Button type="button" onClick={() => setDrawerOpen(true)}>
            Open entity drawer
          </Button>
          <Button type="button" variant="destructive" onClick={() => setConfirmOpen(true)}>
            Open confirm dialog
          </Button>
        </div>
        <KitEntityDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          title="Sample entity"
          description="Drawer body for kit preview."
        >
          <p className="text-muted-foreground text-sm">Placeholder detail content.</p>
        </KitEntityDrawer>
        <KitConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Delete sample?"
          description="This action is only shown in the dev gallery."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={() => setConfirmOpen(false)}
        />
      </GallerySection>

      <GallerySection title="Empty state">
        <KitEmptyState
          title="No results"
          description="Adjust filters or try another saved view."
          action={<Button size="sm">Clear filters</Button>}
        />
      </GallerySection>

      <GallerySection title="Charts">
        <div className="space-y-8">
          <h3 className="text-sm font-medium">Area trend</h3>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={stacked ? 'default' : 'outline'} onClick={() => setStacked((s) => !s)}>
              {stacked ? 'Stacked' : 'Overlay'}
            </Button>
          </div>
          <AreaTrendChart
            ariaLabel="Conversation trend"
            data={trendByRange[range]}
            range={range}
            onRangeChange={setRange}
            series={[
              { key: 'conversations', name: 'Conversations' },
              {
                key: 'resolved',
                name: 'Resolved',
                stackId: stacked ? 'total' : undefined,
              },
            ]}
          />

          <RoundedBarChart
            ariaLabel="Channel volume"
            data={[
              { label: 'WhatsApp', value: 320 },
              { label: 'Telegram', value: 180 },
              { label: 'Web', value: 95 },
            ]}
          />

          <DonutChart
            ariaLabel="Handler mix"
            data={[
              { name: 'AI', value: 45 },
              { name: 'Human', value: 35 },
              { name: 'Waiting', value: 20 },
            ]}
          />

          <div className="flex flex-wrap gap-6">
            <RadialProgress ariaLabel="SLA met" value={82} label="SLA" />
            <Sparkline
              ariaLabel="Weekly sparkline"
              data={[3, 5, 4, 7, 8, 6, 9].map((value) => ({ value }))}
            />
          </div>

          <Heatmap ariaLabel="Hourly activity" cells={heatmapCells} />

          <FunnelChart
            ariaLabel="Booking funnel"
            steps={[
              { label: 'Inquiries', value: 1000 },
              { label: 'Qualified', value: 620 },
              { label: 'Booked', value: 410 },
              { label: 'Attended', value: 360 },
            ]}
          />
        </div>
      </GallerySection>
    </div>
  )
}

export const KitGalleryPage = () => {
  if (!import.meta.env.DEV) {
    return <Navigate to={ROUTES.OVERVIEW} replace />
  }
  return <KitGalleryDevContent />
}
