import { createColumnHelper } from '@tanstack/react-table'
import { Copy, LayoutGrid, List, Pause, Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAgentActions, useAgents } from '@/application/hooks'
import type { Agent, AgentStatus } from '@/domain/entities'
import { notify } from '@/infrastructure/libs/toast/toast'
import {
  KitAvatar,
  KitChannelBadge,
  KitConfirmDialog,
  KitDataTable,
  KitPageHeader,
  KitRelativeTimeCell,
  KitStatusBadge,
  RadialProgress,
} from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { cn } from '@/presentation/utils'

const columnHelper = createColumnHelper<Agent>()

const statusLabel = (status: AgentStatus, t: (k: string) => string) => {
  if (status === 'live') return t('statusLive')
  if (status === 'paused') return t('statusPaused')
  return t('statusDraft')
}

const statusTone = (status: AgentStatus) => {
  if (status === 'live') return 'ai' as const
  if (status === 'paused') return 'warning' as const
  return 'neutral' as const
}

export const AgentsListPage = () => {
  const { t } = useTranslation('agents')
  const navigate = useNavigate()
  const list = useAgents()
  const actions = useAgentActions()
  const [view, setView] = useState<'cards' | 'table'>('cards')
  const [deleteTarget, setDeleteTarget] = useState<Agent | null>(null)

  const refresh = () => list.refetch()

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => t('colName'),
        cell: (info) => (
          <div className="flex items-center gap-2">
            <KitAvatar name={info.getValue()} size="sm" className="ring-1 ring-ai/30" />
            <div>
              <p className="text-sm font-medium">{info.getValue()}</p>
              <p className="text-muted-foreground line-clamp-1 text-xs">
                {info.row.original.description}
              </p>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('status', {
        header: () => t('colStatus'),
        cell: (info) => (
          <KitStatusBadge
            tone={statusTone(info.getValue())}
            label={statusLabel(info.getValue(), t)}
          />
        ),
      }),
      columnHelper.accessor('channelsConnected', {
        header: () => t('colChannels'),
        cell: (info) => (
          <div className="flex flex-wrap gap-1">
            {info.getValue().map((ch) => (
              <KitChannelBadge key={ch} channel={ch} />
            ))}
          </div>
        ),
      }),
      columnHelper.accessor('conversationsToday', {
        header: () => t('colToday'),
        cell: (info) => <span className="tabular-nums">{info.getValue()}</span>,
      }),
      columnHelper.accessor('resolutionRate', {
        header: () => t('colResolution'),
        cell: (info) => (
          <span className="tabular-nums">{Math.round(info.getValue() * 100)}%</span>
        ),
      }),
      columnHelper.accessor('lastEditedAt', {
        header: () => t('colEdited'),
        cell: (info) => <KitRelativeTimeCell date={info.getValue()} />,
      }),
    ],
    [t],
  )

  const onCreate = async () => {
    const created = await actions.createAgent({
      name: 'New agent',
      description: 'Draft AI agent',
      status: 'draft',
      defaultLanguage: 'en',
      persona: 'Helpful and concise.',
      modelPreset: 'Fast',
      channelsConnected: [],
      conversationsToday: 0,
      resolutionRate: 0,
      avatarTone: 'ai',
      instructions: {
        tone: 'Helpful and concise.',
        languageBehavior: 'auto',
        welcomeMessage: 'Welcome to i-care eye center.',
        boundaries: 'Do not give medical diagnoses.',
        characterLimit: 4000,
        versions: [],
      },
      escalationRules: [],
      performanceSeries: Array.from({ length: 14 }, () => 0),
    })
    notify.success({ title: t('createSuccess') })
    refresh()
    navigate(ROUTES.AGENTS.detail(created.id))
  }

  return (
    <div className="space-y-4 p-6">
      <KitPageHeader
        title={t('title')}
        description={t('description')}
        primaryActions={
          <div className="flex flex-wrap gap-2">
            <div className="bg-muted inline-flex rounded-control border border-border p-0.5">
              <button
                type="button"
                className={cn(
                  'inline-flex items-center gap-1 rounded-[8px] px-2.5 py-1.5 text-xs',
                  view === 'cards' ? 'bg-card text-foreground shadow-xs' : 'text-muted-foreground',
                )}
                onClick={() => setView('cards')}
              >
                <LayoutGrid className="size-3.5" />
                {t('viewCards')}
              </button>
              <button
                type="button"
                className={cn(
                  'inline-flex items-center gap-1 rounded-[8px] px-2.5 py-1.5 text-xs',
                  view === 'table' ? 'bg-card text-foreground shadow-xs' : 'text-muted-foreground',
                )}
                onClick={() => setView('table')}
              >
                <List className="size-3.5" />
                {t('viewTable')}
              </button>
            </div>
            <Button type="button" onClick={() => void onCreate()}>
              <Plus className="size-4" />
              {t('create')}
            </Button>
          </div>
        }
      />

      {view === 'cards' ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {(list.data ?? []).map((agent) => (
            <article
              key={agent.id}
              className="rounded-card border border-border bg-card p-4 transition hover:border-ai/40"
            >
              <button
                type="button"
                className="flex w-full items-start gap-3 text-start"
                onClick={() => navigate(ROUTES.AGENTS.detail(agent.id))}
              >
                <KitAvatar name={agent.name} size="lg" className="ring-2 ring-ai/25" />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-semibold">{agent.name}</h3>
                    <KitStatusBadge
                      tone={statusTone(agent.status)}
                      label={statusLabel(agent.status, t)}
                    />
                  </div>
                  <p className="text-muted-foreground line-clamp-2 text-xs">{agent.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {agent.channelsConnected.map((ch) => (
                      <KitChannelBadge key={ch} channel={ch} />
                    ))}
                  </div>
                </div>
              </button>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="space-y-1 text-xs">
                  <p className="text-muted-foreground">{t('conversationsToday')}</p>
                  <p className="text-sm font-medium tabular-nums">{agent.conversationsToday}</p>
                  <p className="text-muted-foreground pt-2">{t('lastEdited')}</p>
                  <KitRelativeTimeCell date={agent.lastEditedAt} />
                </div>
                <RadialProgress
                  value={Math.round(agent.resolutionRate * 100)}
                  max={100}
                  size={88}
                  framed={false}
                  ariaLabel={t('resolutionRate')}
                  label={`${Math.round(agent.resolutionRate * 100)}%`}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-1 border-t border-border pt-3">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    void actions.duplicateAgent(agent.id).then(() => {
                      notify.success({ title: t('duplicateSuccess') })
                      refresh()
                    })
                  }}
                >
                  <Copy className="size-3.5" />
                  {t('duplicate')}
                </Button>
                {agent.status === 'live' ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      void actions.pauseAgent(agent.id).then(() => {
                        notify.success({ title: t('pauseSuccess') })
                        refresh()
                      })
                    }}
                  >
                    <Pause className="size-3.5" />
                    {t('pause')}
                  </Button>
                ) : agent.status === 'paused' ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      void actions.resumeAgent(agent.id).then(() => {
                        notify.success({ title: t('resumeSuccess') })
                        refresh()
                      })
                    }}
                  >
                    {t('resume')}
                  </Button>
                ) : null}
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => setDeleteTarget(agent)}
                >
                  <Trash2 className="size-3.5" />
                  {t('delete')}
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <KitDataTable
          columns={columns}
          data={list.data ?? []}
          getRowId={(row) => row.id}
          isLoading={list.isLoading}
          error={list.error}
          onRetry={list.refetch}
          onRowClick={(row) => navigate(ROUTES.AGENTS.detail(row.id))}
          urlStateKey="agents"
          hideToolbar
        />
      )}

      <KitConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
        title={t('deleteTitle')}
        description={t('deleteDescription')}
        destructive
        undoLabel="Undo"
        onUndo={
          deleteTarget
            ? async () => {
                await actions.createAgent({ ...deleteTarget, id: deleteTarget.id })
                refresh()
              }
            : undefined
        }
        onConfirm={async () => {
          if (!deleteTarget) return
          await actions.deleteAgent(deleteTarget.id)
          notify.success({ title: t('deleteSuccess') })
          refresh()
          setDeleteTarget(null)
        }}
      />
    </div>
  )
}
