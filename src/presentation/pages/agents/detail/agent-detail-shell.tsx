import { createColumnHelper } from '@tanstack/react-table'
import {
  Activity,
  Bot,
  Calendar,
  Clock,
  FileText,
  HandCoins,
  Image,
  MessageSquare,
  Phone,
  Sparkles,
  User,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import {
  useAgent,
  useAgentActions,
  useAgentTools,
  useKnowledgeBase,
  useWorkflows,
} from '@/application/hooks'
import type {
  AgentDetailTab,
  KnowledgeArticle,
  PlaygroundDebug,
  Workflow,
} from '@/domain/entities'
import { notify } from '@/infrastructure/libs/toast/toast'
import {
  FunnelChart,
  KitAiBanner,
  KitAvatar,
  KitDataTable,
  KitEntityDrawer,
  KitPageHeader,
  KitRelativeTimeCell,
  KitStatusBadge,
  Sparkline,
  StatCard,
  StatsStrip,
} from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Textarea } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { cn } from '@/presentation/utils'

const kbHelper = createColumnHelper<KnowledgeArticle>()

const stepIcon = (iconKey: string) => {
  const map: Record<string, typeof User> = {
    service: Activity,
    user: User,
    phone: Phone,
    degree: Bot,
    doctor: Bot,
    calendar: Calendar,
    clock: Clock,
    cost: HandCoins,
    handoff: MessageSquare,
    image: Image,
    file: FileText,
    receipt: FileText,
    card: FileText,
    channel: MessageSquare,
    help: Sparkles,
    summary: FileText,
    intent: Sparkles,
    action: Activity,
  }
  return map[iconKey] ?? Activity
}

const tabs: AgentDetailTab[] = [
  'overview',
  'instructions',
  'knowledge',
  'workflows',
  'tools',
  'escalation',
  'playground',
]

export interface AgentDetailShellProps {
  agentId: string
}

export const AgentDetailShell = ({ agentId }: AgentDetailShellProps) => {
  const { t } = useTranslation('agents')
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const tabParam = (params.get('tab') as AgentDetailTab | null) ?? 'overview'
  const tab = tabs.includes(tabParam) ? tabParam : 'overview'
  const workflowId = params.get('workflowId')

  const agent = useAgent(agentId)
  const actions = useAgentActions()
  const kb = useKnowledgeBase({ search: '' })
  const workflows = useWorkflows()
  const tools = useAgentTools()

  const [tone, setTone] = useState('')
  const [languageBehavior, setLanguageBehavior] = useState<'auto' | 'en' | 'ar'>('auto')
  const [welcome, setWelcome] = useState('')
  const [boundaries, setBoundaries] = useState('')
  const [versionsOpen, setVersionsOpen] = useState(false)
  const [kbOpen, setKbOpen] = useState(false)
  const [kbTitle, setKbTitle] = useState('')
  const [kbBody, setKbBody] = useState('')
  const [kbKind, setKbKind] = useState<'article' | 'file'>('article')
  const [kbFileName, setKbFileName] = useState('')
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [chat, setChat] = useState<{ role: 'user' | 'agent'; text: string }[]>([])
  const [prompt, setPrompt] = useState('')
  const [debug, setDebug] = useState<PlaygroundDebug | null>(null)
  const [whenKey, setWhenKey] = useState<'ask_human' | 'failed_understandings' | 'complaint'>(
    'ask_human',
  )

  useEffect(() => {
    if (!agent.data) return
    setTone(agent.data.instructions.tone)
    setLanguageBehavior(agent.data.instructions.languageBehavior)
    setWelcome(agent.data.instructions.welcomeMessage)
    setBoundaries(agent.data.instructions.boundaries)
  }, [agent.data])

  useEffect(() => {
    const list = workflows.data ?? []
    if (!list.length) return
    const match = workflowId ? list.find((w) => w.id === workflowId) : null
    setSelectedWorkflow(match ?? list[0] ?? null)
  }, [workflows.data, workflowId])

  const setTab = (next: AgentDetailTab) => {
    const nextParams = new URLSearchParams(params)
    nextParams.set('tab', next)
    if (next !== 'workflows') nextParams.delete('workflowId')
    setParams(nextParams, { replace: true })
  }

  const data = agent.data
  const charCount = welcome.length + boundaries.length + tone.length
  const limit = data?.instructions.characterLimit ?? 4000

  const kbColumns = useMemo(
    () => [
      kbHelper.accessor('kind', {
        header: () => t('kbKind'),
        cell: (info) => (
          <KitStatusBadge
            tone="neutral"
            label={info.getValue() === 'file' ? t('kbFile') : t('kbArticle')}
          />
        ),
      }),
      kbHelper.accessor('title', { header: () => t('kbTitle') }),
      kbHelper.accessor('status', {
        header: () => t('kbStatus'),
        cell: (info) => (
          <KitStatusBadge
            tone={info.getValue() === 'enabled' ? 'success' : 'neutral'}
            label={info.getValue() === 'enabled' ? t('kbEnabled') : t('kbDisabled')}
          />
        ),
      }),
      kbHelper.accessor('usageCount', {
        header: () => t('kbUsage'),
        cell: (info) => <span className="tabular-nums">{info.getValue()}</span>,
      }),
      kbHelper.accessor('updatedAt', {
        header: () => t('kbUpdated'),
        cell: (info) => <KitRelativeTimeCell date={info.getValue()} />,
      }),
      kbHelper.accessor('ownerName', { header: () => t('kbOwner') }),
    ],
    [t],
  )

  const tabLabel = (id: AgentDetailTab) => {
    const map: Record<AgentDetailTab, string> = {
      overview: t('tabOverview'),
      instructions: t('tabInstructions'),
      knowledge: t('tabKnowledge'),
      workflows: t('tabWorkflows'),
      tools: t('tabTools'),
      escalation: t('tabEscalation'),
      playground: t('tabPlayground'),
    }
    return map[id]
  }

  return (
    <div className="space-y-4 p-6">
      <KitPageHeader
        title={data?.name ?? t('detailTitle')}
        description={data?.description}
        primaryActions={
          <Button type="button" variant="outline" asChild>
            <Link to={ROUTES.AGENTS.LIST}>{t('backToList')}</Link>
          </Button>
        }
      />

      {data ? (
        <div className="flex flex-wrap items-center gap-3">
          <KitAvatar name={data.name} size="lg" className="ring-2 ring-ai/30" />
          <KitStatusBadge
            tone={
              data.status === 'live' ? 'ai' : data.status === 'paused' ? 'warning' : 'neutral'
            }
            label={
              data.status === 'live'
                ? t('statusLive')
                : data.status === 'paused'
                  ? t('statusPaused')
                  : t('statusDraft')
            }
          />
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {tabs.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              'inline-flex items-center rounded-full border px-3 py-1.5 text-xs',
              tab === id
                ? 'border-ai/40 bg-ai-soft text-ai'
                : 'border-border text-muted-foreground',
            )}
          >
            {tabLabel(id)}
          </button>
        ))}
      </div>

      {tab === 'overview' && data ? (
        <div className="space-y-4">
          <KitAiBanner count={data.conversationsToday} message={t('overviewBanner')} />
          <StatsStrip>
            <StatCard
              icon={MessageSquare}
              label={t('statConversations')}
              value={data.conversationsToday}
            />
            <StatCard
              icon={Activity}
              label={t('statResolution')}
              value={`${Math.round(data.resolutionRate * 100)}%`}
            />
            <StatCard
              icon={Phone}
              label={t('statChannels')}
              value={data.channelsConnected.length}
            />
            <StatCard icon={Sparkles} label={t('statSeries')} value={data.performanceSeries.at(-1) ?? 0} />
          </StatsStrip>
          <div className="rounded-card border border-border bg-card p-4">
            <p className="mb-2 text-sm font-medium">{t('statSeries')}</p>
            <Sparkline
              data={data.performanceSeries.map((value) => ({ value }))}
              ariaLabel={t('statSeries')}
              height={64}
              width={480}
              className="w-full"
            />
          </div>
        </div>
      ) : null}

      {tab === 'instructions' && data ? (
        <div className="space-y-3 max-w-2xl">
          <label className="block space-y-1 text-sm">
            <span>{t('fieldTone')}</span>
            <Textarea value={tone} onChange={(e) => setTone(e.target.value)} />
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldLanguage')}</span>
            <select
              className="border-input bg-background h-9 w-full rounded-control border px-2"
              value={languageBehavior}
              onChange={(e) =>
                setLanguageBehavior(e.target.value as 'auto' | 'en' | 'ar')
              }
            >
              <option value="auto">{t('langAuto')}</option>
              <option value="en">{t('langEn')}</option>
              <option value="ar">{t('langAr')}</option>
            </select>
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldWelcome')}</span>
            <Textarea value={welcome} onChange={(e) => setWelcome(e.target.value)} />
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldBoundaries')}</span>
            <Textarea value={boundaries} onChange={(e) => setBoundaries(e.target.value)} />
          </label>
          <p
            className={cn(
              'text-xs tabular-nums',
              charCount > limit ? 'text-destructive' : 'text-muted-foreground',
            )}
          >
            {t('charCount')}: {charCount} / {limit}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              disabled={charCount > limit}
              onClick={() => {
                void actions
                  .updateInstructions(data.id, {
                    tone,
                    languageBehavior,
                    welcomeMessage: welcome,
                    boundaries,
                  })
                  .then(() => {
                    notify.success({ title: t('saveSuccess') })
                    agent.refetch()
                  })
              }}
            >
              {t('saveInstructions')}
            </Button>
            <Button type="button" variant="outline" onClick={() => setVersionsOpen(true)}>
              {t('versionHistory')}
            </Button>
          </div>
          <KitEntityDrawer
            open={versionsOpen}
            onOpenChange={setVersionsOpen}
            title={t('versionHistory')}
          >
            <ul className="space-y-3">
              {data.instructions.versions.map((ver) => (
                <li key={ver.id} className="rounded-card border border-border p-3 text-sm">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="font-medium">{ver.label}</span>
                    <KitRelativeTimeCell date={ver.savedAt} />
                  </div>
                  <p className="text-muted-foreground whitespace-pre-wrap text-xs">{ver.body}</p>
                </li>
              ))}
            </ul>
          </KitEntityDrawer>
        </div>
      ) : null}

      {tab === 'knowledge' ? (
        <div className="space-y-3">
          <Button type="button" onClick={() => setKbOpen(true)}>
            {t('kbAdd')}
          </Button>
          <KitDataTable
            columns={kbColumns}
            data={kb.data?.items ?? []}
            getRowId={(row) => row.id}
            isLoading={kb.isLoading}
            error={kb.error}
            onRetry={kb.refetch}
            urlStateKey="agent-kb"
            bulkActions={[
              {
                id: 'enable',
                label: t('kbEnable'),
                onAction: async (_rows, ids) => {
                  await actions.setKnowledgeStatus(ids, 'enabled')
                  kb.refetch()
                },
              },
              {
                id: 'disable',
                label: t('kbDisable'),
                onAction: async (_rows, ids) => {
                  await actions.setKnowledgeStatus(ids, 'disabled')
                  kb.refetch()
                },
              },
              {
                id: 'delete',
                label: t('kbDelete'),
                variant: 'destructive',
                onAction: async (_rows, ids) => {
                  await actions.deleteKnowledge(ids)
                  kb.refetch()
                },
              },
            ]}
          />
          <KitEntityDrawer open={kbOpen} onOpenChange={setKbOpen} title={t('kbAdd')}>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault()
                void actions
                  .createKnowledge({
                    title: kbTitle,
                    body: kbBody,
                    locale: 'en',
                    tags: ['eye-care'],
                    kind: kbKind,
                    status: 'enabled',
                    ownerName: 'You',
                    fileName: kbKind === 'file' ? kbFileName || 'upload.pdf' : undefined,
                    agentId,
                  })
                  .then(() => {
                    setKbOpen(false)
                    setKbTitle('')
                    setKbBody('')
                    kb.refetch()
                    notify.success({ title: t('saveSuccess') })
                  })
              }}
            >
              <label className="block space-y-1 text-sm">
                <span>{t('kbTitle')}</span>
                <Input value={kbTitle} onChange={(e) => setKbTitle(e.target.value)} required />
              </label>
              <label className="block space-y-1 text-sm">
                <span>{t('kbKind')}</span>
                <select
                  className="border-input bg-background h-9 w-full rounded-control border px-2"
                  value={kbKind}
                  onChange={(e) => setKbKind(e.target.value as 'article' | 'file')}
                >
                  <option value="article">{t('kbArticle')}</option>
                  <option value="file">{t('kbFile')}</option>
                </select>
              </label>
              {kbKind === 'file' ? (
                <label className="block space-y-1 text-sm">
                  <span>{t('kbUploadStub')}</span>
                  <Input value={kbFileName} onChange={(e) => setKbFileName(e.target.value)} />
                </label>
              ) : null}
              <label className="block space-y-1 text-sm">
                <span>{t('kbBody')}</span>
                <Textarea value={kbBody} onChange={(e) => setKbBody(e.target.value)} required />
              </label>
              <Button type="submit">{t('kbAdd')}</Button>
            </form>
          </KitEntityDrawer>
        </div>
      ) : null}

      {tab === 'workflows' ? (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-3 sm:grid-cols-2">
            {(workflows.data ?? []).map((wf) => (
              <button
                key={wf.id}
                type="button"
                onClick={() => {
                  setSelectedWorkflow(wf)
                  const next = new URLSearchParams(params)
                  next.set('tab', 'workflows')
                  next.set('workflowId', wf.id)
                  setParams(next, { replace: true })
                }}
                className={cn(
                  'rounded-card border bg-card p-3 text-start transition',
                  selectedWorkflow?.id === wf.id
                    ? 'border-ai/40 ring-1 ring-ai/20'
                    : 'border-border hover:border-ai/30',
                )}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">{wf.name}</h3>
                  <span className="text-xs tabular-nums text-ai">
                    {Math.round(wf.completionRate * 100)}%
                  </span>
                </div>
                <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">{wf.description}</p>
                <FunnelChart
                  steps={wf.stepDropoff.map((s) => ({ label: s.label, value: s.count }))}
                  ariaLabel={wf.name}
                  framed={false}
                  className="h-28"
                />
              </button>
            ))}
          </div>
          <aside className="rounded-card border border-border bg-card p-4 h-fit">
            <h3 className="mb-3 text-sm font-semibold">
              {selectedWorkflow?.name ?? t('workflowSteps')}
            </h3>
            <ol className="space-y-3">
              {(selectedWorkflow?.steps ?? []).map((step) => {
                const Icon = stepIcon(step.iconKey)
                return (
                  <li key={step.id} className="flex gap-3">
                    <div className="bg-ai-soft text-ai flex size-8 shrink-0 items-center justify-center rounded-full">
                      <Icon className="size-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {step.order}. {step.title}
                      </p>
                      <p className="text-muted-foreground text-xs">{step.description}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </aside>
        </div>
      ) : null}

      {tab === 'tools' ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(tools.data ?? []).map((tool) => (
            <div key={tool.id} className="rounded-card border border-border bg-card p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold">{tool.name}</h3>
                  <p className="text-muted-foreground text-xs">{tool.description}</p>
                </div>
                <KitStatusBadge tone="neutral" label={tool.type} />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={tool.enabled}
                  onChange={(e) => {
                    void actions.setToolEnabled(tool.id, e.target.checked).then(() => {
                      tools.refetch()
                    })
                  }}
                />
                <span>{tool.enabled ? t('kbEnabled') : t('kbDisabled')}</span>
              </label>
            </div>
          ))}
        </div>
      ) : null}

      {tab === 'escalation' && data ? (
        <div className="space-y-4 max-w-2xl">
          <ul className="space-y-2">
            {data.escalationRules.map((rule) => (
              <li
                key={rule.id}
                className="rounded-card border border-border bg-card p-3 flex flex-wrap items-center justify-between gap-2"
              >
                <div className="text-sm">
                  <p>
                    <span className="text-muted-foreground">{t('ruleWhen')}: </span>
                    {rule.when}
                  </p>
                  <p>
                    <span className="text-muted-foreground">{t('ruleThen')}: </span>
                    {rule.then}
                  </p>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={rule.enabled}
                    onChange={(e) => {
                      void actions
                        .setEscalationRuleEnabled(data.id, rule.id, e.target.checked)
                        .then(() => agent.refetch())
                    }}
                  />
                  {rule.enabled ? t('kbEnabled') : t('kbDisabled')}
                </label>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-end gap-2">
            <label className="text-sm space-y-1">
              <span>{t('ruleWhen')}</span>
              <select
                className="border-input bg-background h-9 rounded-control border px-2"
                value={whenKey}
                onChange={(e) =>
                  setWhenKey(e.target.value as 'ask_human' | 'failed_understandings' | 'complaint')
                }
              >
                <option value="ask_human">{t('ruleAskHuman')}</option>
                <option value="failed_understandings">{t('ruleFailed')}</option>
                <option value="complaint">{t('ruleComplaint')}</option>
              </select>
            </label>
            <Button
              type="button"
              onClick={() => {
                const when =
                  whenKey === 'ask_human'
                    ? t('ruleAskHuman')
                    : whenKey === 'failed_understandings'
                      ? t('ruleFailed')
                      : t('ruleComplaint')
                const then =
                  whenKey === 'ask_human'
                    ? t('ruleThenHandoff')
                    : whenKey === 'failed_understandings'
                      ? t('ruleThenOffer')
                      : t('ruleThenSupervisor')
                void actions
                  .addEscalationRule(data.id, {
                    whenKey,
                    when,
                    then,
                    enabled: true,
                  })
                  .then(() => {
                    agent.refetch()
                    notify.success({ title: t('saveSuccess') })
                  })
              }}
            >
              {t('ruleAdd')}
            </Button>
          </div>
        </div>
      ) : null}

      {tab === 'playground' && data ? (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-card border border-border bg-card flex flex-col min-h-[360px]">
            <div className="flex-1 space-y-2 overflow-y-auto p-4">
              {chat.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={cn(
                    'max-w-[85%] rounded-card px-3 py-2 text-sm',
                    msg.role === 'user'
                      ? 'ms-auto bg-primary text-primary-foreground'
                      : 'bg-ai-soft text-foreground',
                  )}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form
              className="flex gap-2 border-t border-border p-3"
              onSubmit={(e) => {
                e.preventDefault()
                if (!prompt.trim()) return
                const text = prompt.trim()
                setChat((prev) => [...prev, { role: 'user', text }])
                setPrompt('')
                void actions.sendPlaygroundMessage(data.id, text).then((res) => {
                  setChat((prev) => [...prev, { role: 'agent', text: res.reply }])
                  setDebug(res.debug)
                })
              }}
            >
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t('playgroundPlaceholder')}
              />
              <Button type="submit" disabled={actions.isPlaygroundSending}>
                {t('playgroundSend')}
              </Button>
            </form>
          </div>
          <aside className="rounded-card border border-ai/30 bg-ai-soft/40 p-4 h-fit space-y-3">
            <div className="flex items-center gap-2 text-ai">
              <Sparkles className="size-4" />
              <h3 className="text-sm font-semibold">{t('playgroundDebug')}</h3>
            </div>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-muted-foreground text-xs">{t('playgroundIntent')}</dt>
                <dd>{debug?.intent ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">{t('playgroundStep')}</dt>
                <dd>{debug?.step ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">{t('playgroundTools')}</dt>
                <dd>{debug?.toolCalls?.length ? debug.toolCalls.join(', ') : '—'}</dd>
              </div>
            </dl>
          </aside>
        </div>
      ) : null}

      {!data && !agent.isLoading ? (
        <Button type="button" variant="outline" onClick={() => navigate(ROUTES.AGENTS.LIST)}>
          {t('backToList')}
        </Button>
      ) : null}
    </div>
  )
}
