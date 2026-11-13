import { Bot } from 'lucide-react'
import { useState } from 'react'

import type { Conversation, Message } from '@/domain/entities'
import { KitAiBanner, KitEmptyState, KitStatusBadge } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { cn } from '@/presentation/utils'

import { AttachmentLightbox } from './attachment-lightbox'
import { Composer } from './composer'

export interface ThreadPaneProps {
  conversation: Conversation | null
  messages: Message[]
  isLoading?: boolean
  onTakeOver: () => void
  onHandBack: () => void
  onTransfer: () => void
  onResolve: () => void
  onSend: (body: string) => void | Promise<void>
  onBack?: () => void
  showBack?: boolean
}

const bubbleClass = (sender: Message['senderType']) => {
  if (sender === 'customer') return 'bg-muted text-foreground ms-0 me-8'
  if (sender === 'ai') return 'bg-ai-soft text-foreground border border-ai/20 ms-8 me-0'
  if (sender === 'agent') return 'bg-primary/10 text-foreground border border-primary/20 ms-8 me-0'
  return ''
}

export const ThreadPane = ({
  conversation,
  messages,
  isLoading,
  onTakeOver,
  onHandBack,
  onTransfer,
  onResolve,
  onSend,
  onBack,
  showBack,
}: ThreadPaneProps) => {
  const { t } = useTranslation('inbox')
  const [lightbox, setLightbox] = useState<{ url: string; title: string } | null>(null)

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center bg-background p-6">
        <KitEmptyState
          title={t('emptySelect')}
          description={t('emptySelectHint')}
          className="border-none bg-transparent shadow-none"
        />
      </div>
    )
  }

  const aiOwned = conversation.handler === 'ai'
  const humanOwned = conversation.handler === 'human'

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <header className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        {showBack ? (
          <Button type="button" size="sm" variant="ghost" onClick={onBack}>
            {t('backToList')}
          </Button>
        ) : null}
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold">
            {conversation.customerName ?? conversation.id}
          </h2>
          <p className="text-muted-foreground truncate text-xs">{conversation.subject}</p>
        </div>
        {humanOwned ? (
          <div className="flex flex-wrap gap-1.5">
            <Button type="button" size="sm" variant="outline" onClick={onHandBack}>
              {t('handBack')}
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={onTransfer}>
              {t('transfer')}
            </Button>
            <Button type="button" size="sm" onClick={onResolve}>
              {t('resolve')}
            </Button>
          </div>
        ) : null}
      </header>

      {aiOwned ? (
        <div className="border-b border-border p-3">
          <KitAiBanner
            count={1}
            message={t('aiHandlingBanner')}
            actionLabel={t('takeOver')}
            onViewLog={onTakeOver}
            dismissible={false}
          />
        </div>
      ) : null}

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-16 w-2/3" />
            <Skeleton className="ms-auto h-16 w-2/3" />
          </div>
        ) : (
          messages.map((message) => {
            if (message.senderType === 'system' || message.metadata?.kind === 'system') {
              return (
                <p
                  key={message.id}
                  className="text-muted-foreground py-1 text-center text-xs italic"
                >
                  {message.body}
                </p>
              )
            }

            const attachment = message.metadata?.kind === 'attachment'
            return (
              <div
                key={message.id}
                className={cn('rounded-card px-3 py-2 text-sm shadow-elevation-xs', bubbleClass(message.senderType))}
              >
                <div className="mb-1 flex items-center gap-2">
                  {message.senderType === 'ai' ? (
                    <KitStatusBadge tone="ai" label={t('handledAi')} icon={Bot} />
                  ) : message.senderType === 'agent' ? (
                    <KitStatusBadge tone="info" label={t('handledHuman')} />
                  ) : null}
                  <span className="text-muted-foreground ms-auto text-[10px] tabular-nums">
                    {new Date(message.sentAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p>{message.body}</p>
                {attachment && message.metadata?.url ? (
                  <button
                    type="button"
                    className="mt-2 block overflow-hidden rounded-control border border-border"
                    onClick={() =>
                      setLightbox({
                        url: message.metadata?.url ?? '',
                        title:
                          message.metadata?.fileName ??
                          message.metadata?.attachmentType ??
                          t('attach'),
                      })
                    }
                  >
                    <img
                      src={message.metadata.url}
                      alt={message.metadata.fileName ?? ''}
                      className="h-28 w-40 object-cover"
                    />
                  </button>
                ) : null}
              </div>
            )
          })
        )}
        {conversation.isTyping ? (
          <p className="text-muted-foreground flex items-center gap-2 text-xs">
            <span className="bg-ai inline-block size-1.5 animate-pulse rounded-full" />
            {t('typing')}
          </p>
        ) : null}
      </div>

      {humanOwned ? <Composer onSend={onSend} onQuickReply={onSend} /> : null}

      <AttachmentLightbox
        open={Boolean(lightbox)}
        onOpenChange={(open) => {
          if (!open) setLightbox(null)
        }}
        url={lightbox?.url}
        title={lightbox?.title ?? ''}
      />
    </div>
  )
}
