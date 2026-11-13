import { zodResolver } from '@hookform/resolvers/zod'
import { createColumnHelper } from '@tanstack/react-table'
import { UserPlus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  useRolesSettings,
  useSettingsActions,
  useTeamMembers,
} from '@/application/hooks'
import type { TeamMember } from '@/domain/entities/settings.entity'
import { teamInviteSchema, type TeamInviteSchema } from '@/domain/schemas'
import { notify } from '@/infrastructure/libs/toast/toast'
import {
  KitDataTable,
  KitEntityDrawer,
  KitStatusBadge,
} from '@/presentation/components/kit'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { Button } from '@/presentation/components/ui/button'
import { Field, FieldLabel } from '@/presentation/components/ui/field'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'

const columnHelper = createColumnHelper<TeamMember>()

export const SettingsTeamPage = () => {
  const { t } = useTranslation('settings')
  const team = useTeamMembers()
  const roles = useRolesSettings()
  const { inviteTeamMember, deactivateTeamMembers } = useSettingsActions()
  const [inviteOpen, setInviteOpen] = useState(false)

  const form = useForm<TeamInviteSchema>({
    resolver: zodResolver(teamInviteSchema),
    defaultValues: { name: '', email: '', roleId: 'role-agent' },
  })

  const roleName = (roleId: string) =>
    roles.data?.find((role) => role.id === roleId)?.name ?? roleId

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', { header: () => t('colName') }),
      columnHelper.accessor('email', { header: () => t('colEmail') }),
      columnHelper.accessor('roleId', {
        header: () => t('colRole'),
        cell: (info) => (
          <KitStatusBadge tone="info" variant="soft" label={roleName(info.getValue())} />
        ),
      }),
      columnHelper.accessor('status', {
        header: () => t('colStatus'),
        cell: (info) => (
          <KitStatusBadge
            tone={
              info.getValue() === 'active'
                ? 'success'
                : info.getValue() === 'invited'
                  ? 'warning'
                  : 'neutral'
            }
            label={t(`member_${info.getValue()}` as 'member_active')}
          />
        ),
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps -- roleName uses roles.data
    [roles.data, t],
  )

  const onInvite = form.handleSubmit(async (values) => {
    await inviteTeamMember(values)
    notify.success({ title: t('inviteSent') })
    setInviteOpen(false)
    form.reset({ name: '', email: '', roleId: 'role-agent' })
    team.refetch()
  })

  return (
    <AsyncBoundary isLoading={team.isLoading} error={team.error} onRetry={team.refetch}>
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{t('teamTitle')}</h2>
            <p className="text-sm text-muted-foreground">{t('teamDescription')}</p>
          </div>
          <Button type="button" size="sm" onClick={() => setInviteOpen(true)}>
            <UserPlus className="size-3.5" aria-hidden />
            {t('inviteMember')}
          </Button>
        </div>

        <KitDataTable
          columns={columns}
          data={team.data ?? []}
          getRowId={(row) => row.id}
          emptyMessage={t('teamEmpty')}
          bulkActions={[
            {
              id: 'deactivate',
              label: t('bulkDeactivate'),
              variant: 'destructive',
              onAction: async (_rows, ids) => {
                await deactivateTeamMembers(ids)
                notify.success({ title: t('deactivated') })
                team.refetch()
              },
            },
          ]}
        />

        <KitEntityDrawer
          open={inviteOpen}
          onOpenChange={setInviteOpen}
          title={t('inviteMember')}
          description={t('inviteDescription')}
        >
          <form className="space-y-4" onSubmit={(e) => void onInvite(e)}>
            <Field>
              <FieldLabel>{t('colName')}</FieldLabel>
              <Input {...form.register('name')} />
            </Field>
            <Field>
              <FieldLabel>{t('colEmail')}</FieldLabel>
              <Input type="email" {...form.register('email')} />
            </Field>
            <Field>
              <FieldLabel>{t('colRole')}</FieldLabel>
              <select
                className="border-input bg-background h-9 w-full rounded-control border px-2"
                value={form.watch('roleId')}
                onChange={(e) => form.setValue('roleId', e.target.value)}
              >
                {(roles.data ?? []).map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </Field>
            <Button type="submit">{t('sendInvite')}</Button>
          </form>
        </KitEntityDrawer>
      </div>
    </AsyncBoundary>
  )
}
