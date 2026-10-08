import { FeatureIcon } from '../components/FeatureIcon'
import { Logo } from '../components/Logo'
import { LoginForm } from '../components/login-form'

type LoginPageProps = {
  onRegister: () => void
}

export function LoginPage({ onRegister }: LoginPageProps) {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <section className="flex flex-col gap-4 bg-[radial-gradient(ellipse_at_50%_45%,rgb(255_255_255/65%),transparent_56%),#f7f9fc] p-6 md:p-10" aria-label="Acesso à conta">
        <div className="flex justify-center md:justify-start">
          <Logo className="text-2xl [&_svg]:h-8 [&_svg]:w-8" />
        </div>
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-sm">
            <LoginForm onRegister={onRegister} />
          </div>
        </div>
      </section>

      <aside className="login-promo relative hidden overflow-hidden bg-white text-[#14283e] lg:block" aria-label="Sobre o LedgerFlow">
        <div className="relative isolate flex min-h-full flex-col justify-center bg-white px-[clamp(48px,7vw,104px)] py-16">
          <div className="relative z-10 max-w-xl">
            <p className="login-promo__eyebrow mb-4 text-sm font-semibold uppercase tracking-[0.12em]">LedgerFlow</p>
            <h1 className="m-0 text-4xl leading-tight font-bold text-[#14283e] xl:text-5xl">Seus gastos,<br /><span className="text-[#168f70]">em boas mãos.</span></h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#c1cede] xl:text-lg">
              Analise seus extratos, organize suas transações e tome decisões financeiras com mais clareza.
            </p>
            <div className="mt-10 grid gap-6">
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-md border border-white/10 bg-[#1b3042] text-[#168f70]"><FeatureIcon kind="upload" /></span>
                <div><h2 className="mb-1 text-sm font-semibold text-[#14283e]">Importe seus extratos</h2><p className="m-0 text-sm leading-relaxed text-[#465d7b]">Envie um arquivo CSV e comece em segundos.</p></div>
              </div>
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-md border border-white/10 bg-[#1b3042] text-[#168f70]"><FeatureIcon kind="sparkle" /></span>
                <div><h2 className="mb-1 text-sm font-semibold text-[#14283e]">Categorias automáticas</h2><p className="m-0 text-sm leading-relaxed text-[#465d7b]">Acompanhe suas transações organizadas por categoria.</p></div>
              </div>
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-md border border-white/10 bg-[#1b3042] text-[#168f70]"><FeatureIcon kind="chart" /></span>
                <div><h2 className="mb-1 text-sm font-semibold text-[#14283e]">Entenda seus hábitos</h2><p className="m-0 text-sm leading-relaxed text-[#465d7b]">Visualize seus gastos e planeje os próximos passos.</p></div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute right-[-15%] bottom-[-5%] left-[-15%] h-[24%] rounded-[48%_52%_0_0/35%_46%_0_0] bg-[linear-gradient(165deg,rgb(20_24_28/6%),rgb(24_86_94/3%)_75%)] transform-[rotate(-7deg)_translateY(21%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute right-[-15%] bottom-[-7%] left-[-25%] z-0 h-[19%] rounded-[47%_53%_0_0/45%_38%_0_0] bg-[linear-gradient(150deg,rgb(20_24_28/4%),rgb(11_40_54/4%)_80%)] transform-[rotate(8deg)_translateY(36%)]" aria-hidden="true" />
        </div>
      </aside>
    </main>
  )
}
