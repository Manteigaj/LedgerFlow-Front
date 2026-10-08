import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from './ui/field'
import { Input } from './ui/input'
import { login } from '../services/auth'
import { useAppStore } from '../stores/appStore'

type LoginFormProps = {
  onRegister: () => void
}

const loginSchema = z.object({
  username: z.string().trim().min(1, 'Informe seu username.'),
  password: z.string().min(1, 'Informe sua senha.'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm({ onRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [notice, setNotice] = useState('')
  const setSession = useAppStore((state) => state.setSession)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (accessToken, credentials) => setSession(accessToken, credentials.username),
  })

  async function submitLogin(credentials: LoginFormData) {
    setNotice('')
    try {
      await loginMutation.mutateAsync(credentials)
    } catch {
      setNotice('Username ou senha inválidos.')
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(submitLogin)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold text-[#14283e]">Bem-vindo de volta!</h1>
          <p className="text-sm text-[#6f829b]">Entre para acessar sua conta LedgerFlow.</p>
        </div>

        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            type="text"
            placeholder="Digite seu username"
            autoComplete="username"
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? 'username-error' : undefined}
            {...register('username')}
          />
          {errors.username && <FieldDescription id="username-error" role="alert" className="text-[#a34423]">{errors.username.message}</FieldDescription>}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className="pr-12"
              {...register('password')}
            />
            <button
              className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-md text-[#506985] outline-none focus-visible:ring-2 focus-visible:ring-ledger-green"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? (
                <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 5 8.5 7s-1.1 3.1-2.6 4.4M6.2 6.2C3.9 7.6 2.5 10.1 2.5 12c0 2 3.5 7 9.5 7a10 10 0 0 0 3-.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <FieldDescription id="password-error" role="alert" className="text-[#a34423]">{errors.password.message}</FieldDescription>}
        </Field>

        <Field>
          <Button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
            <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Button>
          <p className="min-h-4 text-center text-xs text-[#a34423]" aria-live="polite">{notice}</p>
        </Field>

        <FieldSeparator>ou</FieldSeparator>

        <Field>
          <Button variant="outline" type="button" onClick={() => setNotice('O login com Google ainda não está conectado.')}>
            <svg className="size-5" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(3 3)" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.64 5.93c4.46-4.12 7.13-10.2 7.13-17.58Z" transform="translate(-1 0)" />
              <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z" transform="translate(3)" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.78l-7.64-5.93c-2.12 1.42-4.83 2.26-8.26 2.26-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" transform="translate(3 -3)" />
            </svg>
            Entrar com Google
          </Button>
          <FieldDescription className="text-center">
            Ainda não tem uma conta?{' '}
            <button className="font-medium text-ledger-green underline-offset-4 hover:underline" type="button" onClick={onRegister}>
              Cadastre-se
            </button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}