import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Logo } from '../components/Logo'
import { register as registerAccount } from '../services/auth'

type RegisterPageProps = { onBack: () => void }

const registerSchema = z.object({
  username: z.string().trim().min(1, 'Informe um username.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterPage({ onBack }: RegisterPageProps) {
  const [notice, setNotice] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })
  const registerMutation = useMutation({
    mutationFn: registerAccount,
    onSuccess: () => setNotice('Conta criada com sucesso!'),
    onError: () => setNotice('Não foi possível criar a conta.'),
  })

  function submitRegistration(credentials: RegisterFormData) {
    setNotice('')
    registerMutation.mutate(credentials)
  }

  return (
    <div className="w-full max-w-123.75 text-center">
      <Logo className="mx-auto mb-8.5 flex-col gap-4.5 text-[42px] tracking-[-2px] [&_svg]:h-13.5 [&_svg]:w-13.5 max-[420px]:mb-7 max-[420px]:text-[37px] max-[420px]:[&_svg]:h-11.75 max-[420px]:[&_svg]:w-11.75" />
      <h2 id="register-title" className="mb-1 text-[25px] font-semibold tracking-[-0.55px] text-[#14283e] max-[420px]:text-[23px]">Crie sua conta</h2>
      <p className="m-0 text-base text-[#465d7b]">Escolha um username e uma senha para começar.</p>

      <form className="mt-8 flex flex-col text-left" onSubmit={handleSubmit(submitRegistration)}>
        <label className="mb-2 text-sm font-semibold text-[#192d44]" htmlFor="register-username">Username</label>
        <input
          className="mb-5 h-14 rounded-[9px] border border-[#cbd5e2] bg-white/25 px-4 text-sm text-[#1c3048] outline-none transition-[border-color,box-shadow,background] duration-150 placeholder:text-[#8292a9] focus:border-ledger-green focus:bg-white focus:shadow-[0_0_0_3px_rgb(0_0_0/12%)]"
          id="register-username"
          type="text"
          {...register('username')}
          placeholder="Escolha um username"
          autoComplete="username"
          aria-invalid={Boolean(errors.username)}
        />
        {errors.username && <p className="-mt-3 mb-3 text-xs text-[#a34423]" role="alert">{errors.username.message}</p>}

        <label className="mb-2 text-sm font-semibold text-[#192d44]" htmlFor="register-password">Senha</label>
        <input
          className="h-14 rounded-[9px] border border-[#cbd5e2] bg-white/25 px-4 text-sm text-[#1c3048] outline-none transition-[border-color,box-shadow,background] duration-150 placeholder:text-[#8292a9] focus:border-ledger-green focus:bg-white focus:shadow-[0_0_0_3px_rgb(0_0_0/12%)]"
          id="register-password"
          type="password"
          {...register('password')}
          placeholder="Crie uma senha"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.password)}
        />
        {errors.password && <p className="mt-2 text-xs text-[#a34423]" role="alert">{errors.password.message}</p>}

        <button className="mt-7 flex h-14 items-center justify-center gap-2.75 rounded-[9px] border border-transparent bg-linear-to-r from-ledger-action to-ledger-action text-[15px] font-semibold text-white shadow-[0_5px_12px_rgb(0_0_0/12%)] transition-[background,transform,box-shadow] duration-150 hover:-translate-y-px hover:from-ledger-action-hover hover:to-ledger-action-hover hover:shadow-[0_7px_16px_rgb(0_0_0/19%)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ledger-green motion-reduce:transition-none disabled:cursor-wait disabled:opacity-70" type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
        </button>
        <p className="mt-2.25 min-h-4 text-center text-xs text-black" aria-live="polite">{notice}</p>
      </form>

      <p className="mt-5 text-[13px] text-[#8798ae]">
        Já tem uma conta?{' '}
        <button
          className="font-semibold text-ledger-green hover:underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ledger-green"
          type="button"
          onClick={onBack}
        >
          Voltar para entrar
        </button>
      </p>
    </div>
  )
}