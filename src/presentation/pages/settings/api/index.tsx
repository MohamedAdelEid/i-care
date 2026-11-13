import { createColumnHelper } from '@tanstack/react-table'
import { Copy, Eye, FlaskConical } from 'lucide-react'
import { useMemo, useState } from 'react'

import { useApiKeys, useSettingsActions, useWebhooks } from '@/application/hooks'
import type { ApiKeySummary, WebhookEndpoint } from '@/domain/entities/settings.entity'
import { notify } from '@/infrastructure/libs/toast/toast'
import {
  KitDataTable,
  KitRelativeTimeCell,
  KitStatusBadge,
} from '@/presentation/components/kit'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'

const keyHelper = createColumnHelper<ApiKeySummary>()
const hookHelper = createColumnHelper<WebhookEndpoint>()

export const SettingsApiPage = () => {
  const { t } = useTranslation('settings')
  const keys = useApiKeys()
  const webhooks = useWebhooks()
  const { revealApiKey, testWebhook } = useSettingsActions()
  const [revealed, setRevealed] = useState<Record<string, string>>({})

  const keyColumns = useMemo(
    () => [
      keyHelper.accessor('label', { header: () => t('colKeyLabel') }),
      keyHelper.accessor('maskedKey', {
        header: () => t('colKey'),
        cell: (info) => (
          <code className="text-xs">{revealed[info.row.original.id] ?? info.getValue()}</code>
        ),
      }),
      keyHelper.accessor('createdAt', {
        header: () => t('colCreated'),
        cell: (info) => <KitRelativeTimeCell date={info.getValue()} />,
      }),
      keyHelper.display({
        id: 'actions',
        header: () => t('colActions'),
        cell: ({ row }) => (
          <div className="flex gap-1">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={async () => {
                const value = await revealApiKey(row.original.id)
                setRevealed((prev) => ({ ...prev, [row.original.id]: value }))
                notify.success({ title: t('keyRevealed') })
              }}
            >
              <Eye className="size-3.5" aria-hidden />
              {t('reveal')}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={async () => {
                const value =
                  revealed[row.original.id] ?? (await revealApiKey(row.original.id))
                await navigator.clipboard.writeText(value)
                notify.success({ title: t('copied') })
              }}
            >
              <Copy className="size-3.5" aria-hidden />
              {t('copy')}
            </Button>
          </div>
        ),
      }),
    ],
    [revealApiKey, revealed, t],
  )

  const webhookColumns = useMemo(
    () => [
      hookHelper.accessor('url', { header: () => t('colWebhookUrl') }),
      hookHelper.accessor('events', {
        header: () => t('colEvents'),
        cell: (info) => info.getValue().join(', '),
      }),
      hookHelper.accessor('active', {
        header: () => t('colStatus'),
        cell: (info) => (
          <KitStatusBadge
            tone={info.getValue() ? 'success' : 'neutral'}
            label={info.getValue() ? t('webhookActive') : t('webhookInactive')}
          />
        ),
      }),
      hookHelper.display({
        id: 'test',
        header: () => t('colActions'),
        cell: ({ row }) => (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={async () => {
              await testWebhook(row.original.id)
              notify.success({ title: t('webhookTested') })
              webhooks.refetch()
            }}
          >
            <FlaskConical className="size-3.5" aria-hidden />
            {t('testWebhook')}
          </Button>
        ),
      }),
    ],
    [t, testWebhook, webhooks],
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{t('apiTitle')}</h2>
        <p className="text-sm text-muted-foreground">{t('apiDescription')}</p>
      </div>

      <AsyncBoundary isLoading={keys.isLoading} error={keys.error} onRetry={keys.refetch}>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{t('apiKeysHeading')}</h3>
          <KitDataTable
            columns={keyColumns}
            data={keys.data ?? []}
            getRowId={(row) => row.id}
            emptyMessage={t('apiKeysEmpty')}
            hideToolbar
          />
        </div>
      </AsyncBoundary>

      <AsyncBoundary
        isLoading={webhooks.isLoading}
        error={webhooks.error}
        onRetry={webhooks.refetch}
      >
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{t('webhooksHeading')}</h3>
          <KitDataTable
            columns={webhookColumns}
            data={webhooks.data ?? []}
            getRowId={(row) => row.id}
            emptyMessage={t('webhooksEmpty')}
            hideToolbar
          />
        </div>
      </AsyncBoundary>
    </div>
  )
}
