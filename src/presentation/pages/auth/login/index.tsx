import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { createLoginSchema, type LoginSchema } from '@/domain/schemas'
import { useAuthActions } from '@/application/hooks'
import { notify } from '@/infrastructure/libs/toast/toast'
import { BrandMark } from '@/presentation/components/brand'
import { Button } from '@/presentation/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/presentation/components/ui/field'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'

export const LoginPage = () => {
  const { t } = useTranslation('auth')
  const { t: tCommon } = useTranslation('common')
  const navigate = useNavigate()
  const { login, isSubmitting } = useAuthActions()

  const schema = createLoginSchema({
    emailRequired: t('emailRequired'),
    emailInvalid: t('emailInvalid'),
    passwordMin: t('passwordMinLength'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login(values)
      notify.success({ title: t('signIn'), description: t('loginSuccess') })
      navigate(ROUTES.OVERVIEW, { replace: true })
    } catch {
      notify.error({ title: t('loginFailed'), description: t('loginFailedDesc') })
    }
  })

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-5 rounded-card border border-border bg-card p-8 shadow-elevation-sm"
      >
        <div className="space-y-4">
          <BrandMark variant="lockup" className="text-foreground" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{t('loginTitle')}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t('loginSubtitle')}</p>
          </div>
        </div>
        <Field>
          <FieldLabel>{t('email')}</FieldLabel>
          <Input type="email" placeholder={t('emailPlaceholder')} {...register('email')} />
          {errors.email ? <FieldError message={errors.email.message} /> : null}
        </Field>
        <Field>
          <FieldLabel>{t('password')}</FieldLabel>
          <Input type="password" isPasswordField {...register('password')} />
          {errors.password ? <FieldError message={errors.password.message} /> : null}
        </Field>
        <Button type="submit" className="w-full rounded-control" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : t('signIn')}
        </Button>
        <p className="text-center text-xs text-muted-foreground">{tCommon('brandTagline')}</p>
      </form>
    </div>
  )
}
